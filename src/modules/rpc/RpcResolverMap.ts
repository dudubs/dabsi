import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { mapObject } from "@dabsi/common/object/mapObject";
import { Reflector } from "@dabsi/common/reflection/Reflector";
import { RpcMemberResolver, RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { Resolver, ResolverLike, ResolverMap } from "@dabsi/typedi";
import { Rpc, RpcMemberKey, RpcType } from "@dabsi/typerpc2";
import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { GenericConfig2 } from "@dabsi/typerpc2/GenericConfig";
import { getRpcMetadata } from "@dabsi/typerpc2/getRpcMetadata";
import { getRpcWithConfigHandlerType } from "@dabsi/typerpc2/getRpcWithConfigHandlerType";
import {
  AnyInputMap,
  BaseObjectInput,
  ObjectInput,
} from "@dabsi/typerpc2/object-input/rpc";
import { isRpcTypeWithConfig } from "@dabsi/typerpc2/RpcConfig";
import { RpcMembers, RpcMemberType } from "@dabsi/typerpc2/RpcMembers";
import { capitalize } from "@material-ui/core";

export class RpcResolverMap {
  protected _resolverMap = new Map<RpcType, ResolverLike<RpcResolver<any>>>();

  protected _memberResolverMap = new Map<
    RpcType,
    Map<string, ResolverLike<RpcMemberResolver<any, any>>>
  >();

  protected _addMemberResolver(resolver: RpcMemberResolver<any, any>) {
    if (this._resolverMap.has(resolver.rpcType)) {
      throw new Error(
        `You already added handler resolver for "${resolver.rpcType.name}".`
      );
    }
    //
    this._memberResolverMap
      .touch(resolver.rpcType, () => new Map())
      .set(resolver.rpcMemberKey, resolver);
  }

  protected _addResolver(resolver: RpcResolver<any>) {
    if (this._memberResolverMap.has(resolver.rpcType)) {
      throw new Error(
        `You already added a member handler resolver for ${
          resolver.rpcType.name
        } (${[...this._memberResolverMap.get(resolver.rpcType)!.keys()].join(
          ", "
        )}).`
      );
    }
    this._resolverMap.set(resolver.rpcType, resolver);
  }

  add(...resolvers: (RpcMemberResolver<any, any> | RpcResolver<any>)[]) {
    for (const resolver of resolvers) {
      if (
        typeof (resolver as RpcMemberResolver<any, any>).rpcMemberKey ===
        "string"
      ) {
        this._addMemberResolver(<any>resolver);
      } else {
        this._addResolver(resolver);
      }
    }
  }

  buildResolver(rpcType: RpcType): ResolverLike<RpcResolver<any>> {
    if (isRpcTypeWithConfig(rpcType)) {
      const handlerType = getRpcWithConfigHandlerType(rpcType);
      if (handlerType.isRpcConfigCanBeUndefined) {
        return () => undefined;
      }
      throw new Error(
        `Can't build rpc-resolver for rpc-with-config (${rpcType.name}).`
      );
    }

    const handlerResolverMap: ResolverMap = {};
    for (const memberKey of getRpcMetadata(rpcType).memberKeys) {
      handlerResolverMap["handle" + capitalize(memberKey)] = Resolver.custom(
        [this.getMemberResolver(rpcType, memberKey)],
        configFactory =>
          async function (this: any) {
            return (await GenericConfig2(configFactory)).apply(
              this,
              <any>arguments
            );
          }
      );
    }

    return RpcResolver(rpcType, handlerResolverMap, handler => $ => $(handler));
  }

  getMemberResolver<T extends Rpc, K extends RpcMemberKey<T>>(
    rpcType: RpcType<T>,
    memberKey: string & K
  ): ResolverLike<RpcMemberResolver<T, K>> {
    const memberResolver = this._memberResolverMap.get(rpcType)?.get(memberKey);

    if (memberResolver) {
      return memberResolver;
    }

    if (
      RpcMembers.getMemberType(rpcType, memberKey) === RpcMemberType.Contextual
    ) {
      const memberRpcType = Reflector.getPropertyType(rpcType, memberKey);

      return Resolver.custom(
        [this.getResolver(memberRpcType as RpcType)],
        configurator => async $ => {
          return ($ as any)(rpcType => {
            return createRpcHandler(rpcType, configurator);
          });
        }
      );
    }

    throw new Error(`No member handler for "${rpcType.name}.${memberKey}".`);
  }

  protected _generateResolverCache = new Map<
    RpcType,
    ResolverLike<RpcResolver<any>>
  >();

  generateResolver<T extends Rpc>(
    rpcType: RpcType<T>
  ): ResolverLike<RpcResolver<T>> | undefined {
    return this._generateResolverCache.touch(rpcType, () =>
      rpcType[__generateSymbol]?.(rpcType, this)
    );
  }

  getResolver<T extends Rpc>(rpcType: RpcType<T>): RpcResolver<T> {
    return <any>this._resolverMap.touch(rpcType, () => {
      return this.generateResolver(rpcType) ?? this.buildResolver(rpcType);
    });
  }
}

const __generateSymbol = Symbol("__generateSymbol");

export namespace RpcResolverMap {
  export function defineGenerator<T extends Rpc>(
    rpcType: RpcType<T>,
    generator: (
      rpcType: RpcType<T>,
      map: RpcResolverMap
    ) => ResolverLike<RpcResolver<T>>
  ) {
    Object.defineProperty(rpcType, __generateSymbol, {
      enumerable: false,
      value: generator,
    });
  }
}

RpcResolverMap.defineGenerator(
  (BaseObjectInput as any) as RpcType<ObjectInput<AnyInputMap>>,
  (objectInputType, map) => {
    return Resolver(
      [
        Resolver.object(
          mapArrayToObject(
            getRpcMetadata(objectInputType).contextualKeys,
            childKey => [
              childKey,
              map.getMemberResolver(objectInputType, childKey),
            ]
          )
        ) as Resolver<Record<string, any>>,
      ],
      x => $ => $(x)
    );
  }
);
