import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import flat from "@dabsi/common/iterator/flat";
import { defined } from "@dabsi/common/object/defined";
import { capitalize } from "@dabsi/common/string/capitalize";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { Resolver } from "@dabsi/typedi";
import {
  Rpc,
  RpcFunctionalMember,
  RpcNamespace,
  RpcParametrialMember,
  RpcType,
} from "@dabsi/typerpc2";
import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { GenericConfig } from "@dabsi/typerpc2/GenericConfig";
import { getRpcConfigHandlerType } from "@dabsi/typerpc2/getRpcConfigHandlerType";
import { getRpcMetadata, RpcMetadata } from "@dabsi/typerpc2/getRpcMetadata";
import {
  AnyInputMap,
  BaseObjectInput,
  ObjectInput,
} from "@dabsi/typerpc2/object-input/rpc";
import {
  AnyRpcWithConfig,
  isRpcTypeWithConfig,
  RpcMemberConfigurator,
  RpcWithConfig,
} from "@dabsi/typerpc2/RpcConfig";
import { RpcMemberHandler } from "@dabsi/typerpc2/RpcHandler";
import { RpcLocation } from "@dabsi/typerpc2/RpcLocation";
import { RpcMemberType } from "@dabsi/typerpc2/RpcMembers";
import RpcPathMap from "@dabsi/typerpc2/RpcPathMap";
import { RpcTypeOrLocation } from "@dabsi/typerpc2/RpcTypeOrLocation";

type RpcResolversTree = RpcResolver<any> | RpcResolversTree[];

export class RpcResolverBuilder {
  protected _resolverMap = new RpcPathMap<RpcResolver<any>>();
  protected _generetedResolverMap = new RpcPathMap<RpcResolver<any>>();

  add(...args: RpcResolversTree[]) {
    for (const resolver of flat(args)) {
      const {
        rpcLocation: { rpcRootType, path },
      } = resolver;
      this._resolverMap.set(rpcRootType, path, resolver);
    }
  }

  getResolver<T>(rpcLocation: RpcTypeOrLocation<T>): RpcResolver<T> {
    const _rpcLocation = RpcTypeOrLocation(rpcLocation);
    return this._resolverMap.touchByLocation(_rpcLocation, () => {
      return (
        this.generateResolver(rpcLocation) ?? this.buildResolver(_rpcLocation)
      );
    });
  }

  generateResolver<T>(
    rpcLocation: RpcTypeOrLocation<T>
  ): RpcResolver<T> | undefined {
    const _rpcLocation = RpcTypeOrLocation(rpcLocation);
    if (_rpcLocation.member?.type === RpcMemberType.Functional) {
      throw new Error(`Can't generate resolver for functional member.`);
    }
    return this._generetedResolverMap.touchByLocation(_rpcLocation, () => {
      if ((rpcLocation as RpcLocation<any>).rpcType)
        return (rpcLocation as RpcLocation<any>).rpcType[__generateSymbol]?.(
          rpcLocation,
          this
        );
    });
  }

  buildResolver<T>(rpcLocation: RpcTypeOrLocation<T>): RpcResolver<T> {
    const _rpcLocation = RpcTypeOrLocation(rpcLocation);
    if (isRpcTypeWithConfig(_rpcLocation.rpcType)) {
      const handlerType = getRpcConfigHandlerType(_rpcLocation.rpcType);
      if (handlerType.isRpcConfigCanBeUndefined) {
        return <any>(
          RpcResolver(
            _rpcLocation as RpcLocation<AnyRpcWithConfig>,
            [],
            () => $ => $(undefined)
          )
        );
      }
      throw new Error(
        `Can't build rpc-resolver for rpc-with-config (${_rpcLocation.rpcType.name}).`
      );
    }
    return <any>(
      this.buildHandlerResolver(_rpcLocation as RpcLocation<AnyRpcWithConfig>)
    );
  }

  buildHandlerResolver<T extends Rpc>(
    rpcLocation: RpcTypeOrLocation<T>,
    getKeys?: (metadata: RpcMetadata) => string[]
  ): RpcResolver<T> {
    const _rpcLocation = RpcTypeOrLocation(rpcLocation);
    const metadata = getRpcMetadata(_rpcLocation.rpcType as RpcType);
    const handlerMemberResolverMap = mapArrayToObject(
      getKeys ? getKeys(metadata) : metadata.memberKeys,
      memberKey => [
        "handle" + capitalize(memberKey),
        this.getHandlerMemberResolver(<any>_rpcLocation.at(<any>memberKey)),
      ]
    );
    return <any>(
      RpcResolver(
        _rpcLocation as RpcLocation<Rpc>,
        handlerMemberResolverMap as {},
        handler => $ => $(handler)
      )
    );
  }

  getHandlerMemberResolver<T extends Rpc>(
    rpcLocation: RpcLocation<T>
  ): Resolver<RpcMemberHandler<T>> {
    return <any>Resolver([this.getResolver(rpcLocation)], factory => {
      return async function (this: any, childRpcType?) {
        if (rpcLocation.member!.type === RpcMemberType.Contextual) {
          return createRpcHandler(childRpcType!, factory as any);
        }
        const config = await GenericConfig(
          factory as RpcMemberConfigurator<
            RpcFunctionalMember | RpcParametrialMember
          >
        );
        return config.apply(this, <any>arguments);
      };
    });
  }
}

const __generateSymbol = Symbol("__generateSymbol");

export namespace RpcResolverBuilder {
  export function defineGenerator<T extends Rpc>(
    rpcType: RpcType<T>,
    generator: (
      rpcType: RpcLocation<T>,
      builder: RpcResolverBuilder
    ) => RpcResolver<T>
  ) {
    Object.defineProperty(rpcType, __generateSymbol, {
      enumerable: false,
      value: generator,
    });
  }
}

RpcResolverBuilder.defineGenerator(RpcNamespace, (rpcLocation, builder) =>
  RpcResolver(
    rpcLocation,
    [builder.buildHandlerResolver(rpcLocation)],
    handler => $ =>
      $({
        getRpcMemberHandler(rpcType, memberKey, memberType, propertyType): any {
          return defined(
            handler[<any>memberKey],
            () =>
              `No rpc-namespace-key like "${rpcType.name}.${memberKey}":${propertyType.name}`
          );
        },
      })
  )
);

RpcResolverBuilder.defineGenerator(
  (BaseObjectInput as any) as RpcType<ObjectInput<AnyInputMap>>,
  (rpcLocation, builder) =>
    RpcResolver(
      rpcLocation,
      [builder.buildHandlerResolver(rpcLocation, md => md.contextualKeys)],
      x => $ => $(x as {})
    )
);
