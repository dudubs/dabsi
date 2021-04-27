import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { defined } from "@dabsi/common/object/defined";
import { mapObject } from "@dabsi/common/object/mapObject";
import { Reflector } from "@dabsi/common/reflection/Reflector";
import {
  RpcMemberFactory,
  RpcMemberResolver,
  RpcResolver,
} from "@dabsi/modules/rpc/RpcResolver";
import { Resolver, ResolverLike, ResolverMap } from "@dabsi/typedi";
import {
  Rpc,
  RpcContextualMember,
  RpcMemberKey,
  RpcType,
} from "@dabsi/typerpc2";
import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { GenericConfig2 } from "@dabsi/typerpc2/GenericConfig";
import { getRpcMetadata } from "@dabsi/typerpc2/getRpcMetadata";
import { getRpcConfigHandlerType } from "@dabsi/typerpc2/getRpcConfigHandlerType";
import {
  AnyInputMap,
  BaseObjectInput,
  ObjectInput,
} from "@dabsi/typerpc2/object-input/rpc";
import {
  isRpcTypeWithConfig,
  RpcConfigurator,
} from "@dabsi/typerpc2/RpcConfig";
import { RpcMembers, RpcMemberType } from "@dabsi/typerpc2/RpcMembers";
import { capitalize } from "@material-ui/core";

export class RpcResolverBuilder {
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
      const handlerType = getRpcConfigHandlerType(rpcType);
      if (handlerType.isRpcConfigCanBeUndefined) {
        return () => () => createRpcHandler(rpcType, undefined);
      }
      throw new Error(
        `Can't build rpc-resolver for rpc-with-config (${rpcType.name}).`
      );
    }

    const handlerResolverMap: ResolverMap = {};
    for (const memberKey of getRpcMetadata(rpcType).memberKeys) {
      handlerResolverMap["handle" + capitalize(memberKey)] = Resolver.consume(
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
  ): Resolver<RpcMemberFactory<T[K]>> {
    const memberResolver = this._memberResolverMap.get(rpcType)?.get(memberKey);

    if (memberResolver) {
      return memberResolver;
    }

    if (
      RpcMembers.getMemberType(rpcType, memberKey) === RpcMemberType.Contextual
    ) {
      const childRpcType = defined(
        getRpcMetadata(rpcType).childTypeMap[memberKey]
      );

      return <Resolver<RpcMemberFactory<RpcContextualMember>>>(
        Resolver.consume(
          [this.getResolver(childRpcType as RpcType)],
          configurator => $ =>
            $(rpcType => createRpcHandler(rpcType, configurator))
        )
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

export namespace RpcResolverBuilder {
  export function defineGenerator<T extends Rpc>(
    rpcType: RpcType<T>,
    generator: (
      rpcType: RpcType<T>,
      builder: RpcResolverBuilder
    ) => Resolver<RpcConfigurator<T>>
  ) {
    Object.defineProperty(rpcType, __generateSymbol, {
      enumerable: false,
      value: generator,
    });
  }
}

RpcResolverBuilder.defineGenerator(
  (BaseObjectInput as any) as RpcType<ObjectInput<AnyInputMap>>,
  (rpcType, builder) => {
    return Resolver(
      [
        Resolver.object(
          mapArrayToObject(getRpcMetadata(rpcType).contextualKeys, childKey => [
            childKey,
            builder.getMemberResolver(rpcType, childKey),
          ])
        ) as Resolver<Record<string, any>>,
      ],
      x => $ => $(x)
    );
  }
);