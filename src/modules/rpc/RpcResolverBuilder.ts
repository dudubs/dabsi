import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { defined } from "@dabsi/common/object/defined";
import { RpcMemberResolver, RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { Resolver, ResolverLike, ResolverMap } from "@dabsi/typedi";
import {
  Rpc,
  RpcFunctionalMember,
  RpcMemberKey,
  RpcNamespace,
  RpcParametrialMember,
  RpcType,
} from "@dabsi/typerpc2";
import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { GenericConfig2 } from "@dabsi/typerpc2/GenericConfig";
import { getRpcConfigHandlerType } from "@dabsi/typerpc2/getRpcConfigHandlerType";
import {
  getChildRpcType,
  getRpcMetadata,
} from "@dabsi/typerpc2/getRpcMetadata";
import {
  AnyInputMap,
  BaseObjectInput,
  ObjectInput,
} from "@dabsi/typerpc2/object-input/rpc";
import {
  isRpcTypeWithConfig,
  RpcConfigurator,
  RpcMemberConfigurator,
} from "@dabsi/typerpc2/RpcConfig";
import { RpcMemberHandler } from "@dabsi/typerpc2/RpcHandler";
import { RpcMembers, RpcMemberType } from "@dabsi/typerpc2/RpcMembers";
import { capitalize } from "@material-ui/core";

export class RpcResolverBuilder {
  protected _resolverMap = new Map<RpcType, ResolverLike<RpcResolver<any>>>();

  protected _memberResolverMap = new Map<
    RpcType,
    Map<string, Resolver<RpcMemberConfigurator<any>>>
  >();

  protected _addMemberResolver(resolver: RpcMemberResolver<any>) {
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

  add(...resolvers: (RpcMemberResolver<any> | RpcResolver<any>)[]) {
    for (const resolver of resolvers) {
      if (
        typeof (resolver as RpcMemberResolver<any>).rpcMemberKey === "string"
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
      handlerResolverMap[
        "handle" + capitalize(memberKey)
      ] = this.getMemberHandlerResolver(rpcType, memberKey);
    }

    return RpcResolver(rpcType, handlerResolverMap, handler => async $ => {
      return $(handler);
    });
  }

  getMemberHandlerResolver<T extends Rpc, K extends RpcMemberKey<T>>(
    rpcType: RpcType<T>,
    memberKey: K
  ): Resolver<RpcMemberHandler<T[K]>> {
    const memberType = RpcMembers.getMemberType(rpcType, <never>memberKey);

    return <any>(
      Resolver([this.getMemberResolver(rpcType, <never>memberKey)], factory => {
        return async function (this: any, childRpcType?) {
          if (memberType === RpcMemberType.Contextual) {
            return createRpcHandler(childRpcType!, factory as any);
          }
          const config = await GenericConfig2(
            factory as RpcMemberConfigurator<
              RpcFunctionalMember | RpcParametrialMember
            >
          );
          return config.apply(this, <any>arguments);
        };
      })
    );
  }

  getMemberResolver<T extends Rpc, K extends RpcMemberKey<T>>(
    rpcType: RpcType<T>,
    memberKey: string & K
  ): Resolver<RpcMemberConfigurator<T[K]>> {
    const memberResolver = this._memberResolverMap.get(rpcType)?.get(memberKey);

    if (memberResolver) {
      return memberResolver;
    }

    if (
      RpcMembers.getMemberType(rpcType, memberKey) === RpcMemberType.Contextual
    ) {
      return this.getResolver(getChildRpcType(rpcType, memberKey));
    }

    throw new Error(
      `No rpc-memeber-resolver for "${rpcType.name}.${memberKey}".`
    );
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

RpcResolverBuilder.defineGenerator(RpcNamespace, (rpcType, builder) =>
  Resolver(
    mapArrayToObject(getRpcMetadata(rpcType).memberKeys, memberKey => {
      return [
        memberKey,
        builder.getMemberHandlerResolver(rpcType, <never>memberKey),
      ];
    }),

    memberHandlerMap => $ =>
      $({
        getRpcMemberHandler(rpcType, memberKey, memberType, propertyType): any {
          return defined(
            memberHandlerMap[<any>memberKey],
            () =>
              `No member handler for namespace "${rpcType.name}.${memberKey}":${propertyType.name}`
          );
        },
      })
  )
);

RpcResolverBuilder.defineGenerator(
  (BaseObjectInput as any) as RpcType<ObjectInput<AnyInputMap>>,
  (rpcType, builder) =>
    Resolver(
      [
        Resolver.object(
          mapArrayToObject(getRpcMetadata(rpcType).contextualKeys, childKey => [
            childKey,
            builder.getMemberResolver(rpcType, childKey),
          ])
        ) as Resolver<Record<string, any>>,
      ],
      x => $ => $(x)
    )
);
