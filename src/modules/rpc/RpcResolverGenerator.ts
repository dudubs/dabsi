import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import flat, { Flattable } from "@dabsi/common/iterator/flat";
import { defined } from "@dabsi/common/object/defined";
import { capitalize } from "@dabsi/common/string/capitalize";
import { inspect } from "@dabsi/logging/inspect";
import {
  RpcLocationConfigurator,
  RpcResolver,
} from "@dabsi/modules/rpc/RpcResolver";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import {
  Rpc,
  RpcFunctionalMember,
  RpcNamespace,
  RpcParametrialMember,
  RpcType,
} from "@dabsi/typerpc";
import { createRpcHandler } from "@dabsi/typerpc/createRpcHandler";
import { GenericConfig } from "@dabsi/typerpc/GenericConfig";
import { getRpcConfigHandlerType } from "@dabsi/typerpc/getRpcConfigHandlerType";
import { getRpcMetadata, RpcMetadata } from "@dabsi/typerpc/getRpcMetadata";
import { Input } from "@dabsi/typerpc/input/Input";
import {
  AnyInputMap,
  BaseObjectInput,
  ObjectInput,
} from "@dabsi/typerpc/object-input/rpc";
import {
  AnyRpcWithConfig,
  isRpcTypeWithConfig,
} from "@dabsi/typerpc/RpcConfig";
import { RpcHandlerMap, RpcMemberHandler } from "@dabsi/typerpc/RpcHandler";
import { RpcLocation } from "@dabsi/typerpc/RpcLocation";
import { RpcMemberType } from "@dabsi/typerpc/RpcMembers";
import RpcPathMap from "@dabsi/typerpc/RpcPathMap";
import { RpcTypeOrLocation } from "@dabsi/typerpc/RpcTypeOrLocation";

export class RpcResolverGenerator {
  // Later RpcPathMap<Resolver<any>>
  protected _resolverMap = new RpcPathMap<RpcResolver<any>>();

  protected _contextMaFp = new RpcPathMap<ResolverMap>();

  protected _generetedResolverMap = new RpcPathMap<RpcResolver<any>>();

  add(...args: Flattable<RpcResolver<any>>[]) {
    for (const resolver of flat(args)) {
      this._resolverMap.setByLocation(resolver.rpcLocation, resolver);
    }
  }

  getResolver<T>(rpcLocation: RpcTypeOrLocation<T>): RpcResolver<T> {
    const _rpcLocation = RpcTypeOrLocation(rpcLocation);

    return this._resolverMap.touchByLocation(_rpcLocation, () => {
      // _rpcLocation

      if (
        _rpcLocation.member &&
        _rpcLocation.member.type !== RpcMemberType.Contextual
      ) {
        if (_rpcLocation.isParameterialLocation) {
          return this.buildResolver(_rpcLocation);
        }
        throw new Error(
          `Can't build/generate resolver for ${
            RpcMemberType[_rpcLocation.member.type!]
          }: ${inspect(_rpcLocation)}`
        );
      }
      return (
        this.generateResolver(rpcLocation) ?? this.buildResolver(_rpcLocation)
      );
    });
  }

  generateResolver<T>(
    rpcLocation: RpcTypeOrLocation<T>
  ): RpcResolver<T> | undefined {
    const _rpcLocation = RpcTypeOrLocation(rpcLocation);
    if (!_rpcLocation.rpcType) {
      return;
    }

    return this._generetedResolverMap.touchByLocation(_rpcLocation, () => {
      return _rpcLocation.rpcType![__generateSymbol]?.(_rpcLocation, this);
    });
  }

  buildResolver<T>(rpcLocation: RpcTypeOrLocation<T>): RpcResolver<T> {
    const _rpcLocation = RpcTypeOrLocation<any>(rpcLocation);

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
      RpcResolver(
        _rpcLocation as RpcLocation<Rpc>,
        [this.buildHandlerMapResolver(_rpcLocation as RpcLocation<Rpc>)],
        x => $ => $(x)
      )
    );
  }

  buildHandlerMapResolver<T extends Rpc>(
    rpcLocation: RpcTypeOrLocation<T>,
    {
      getKeys,
    }: {
      getKeys?: (metadata: RpcMetadata) => string[];
    } = {}
  ): Resolver<RpcHandlerMap<T>> {
    const _rpcLocation = RpcTypeOrLocation(rpcLocation);
    const metadata = getRpcMetadata(_rpcLocation.rpcType as RpcType);

    const handlerMemberResolverMap = mapArrayToObject(
      getKeys ? getKeys(metadata) : metadata.memberKeys,
      memberKey => [
        "handle" + capitalize(memberKey),
        this.getHandlerMemberResolver(<any>_rpcLocation.at(<any>memberKey)),
      ]
    );

    return <any>Resolver.object(handlerMemberResolverMap as {});
  }

  getHandlerMemberResolver<T>(
    rpcLocation: RpcLocation<T>
  ): Resolver<RpcMemberHandler<T>> {
    return <any>Resolver([this.getResolver(rpcLocation)], factory => {
      return async function (this: any, childRpcType?) {
        if (rpcLocation.member!.type === RpcMemberType.Contextual) {
          return createRpcHandler(childRpcType!, factory as any);
        }
        const config = await GenericConfig(
          factory as RpcLocationConfigurator<
            RpcFunctionalMember | RpcParametrialMember
          >
        );

        return config.apply(this, <any>arguments);
      };
    });
  }
}

const __generateSymbol = Symbol("__generateSymbol");

export namespace RpcResolverGenerator {
  export function defineGenerator<T extends Rpc>(
    rpcType: RpcType<T>,
    generator: (
      rpcType: RpcLocation<T>,
      builder: RpcResolverGenerator
    ) => RpcResolver<T>
  ) {
    Object.defineProperty(rpcType, __generateSymbol, {
      enumerable: false,
      value: generator,
    });
  }
}

{
  RpcResolverGenerator.defineGenerator(RpcNamespace, (rpcLocation, builder) =>
    RpcResolver(
      rpcLocation,
      [builder.buildHandlerMapResolver(rpcLocation)],
      handlerMap => async $ => {
        return $({
          getRpcMemberHandler(member): any {
            return defined(
              (<any>handlerMap)["handle" + capitalize(member.key)],
              () =>
                `No rpc-namespace-key like "${member.rpcType.name}.${member.key}":${member.propertyType.name}`
            );
          },
        });
      }
    )
  );

  RpcResolverGenerator.defineGenerator(
    (BaseObjectInput as any) as RpcType<ObjectInput<AnyInputMap>>,
    (rpcLocation, builder) => {
      const metadata = getRpcMetadata(rpcLocation.rpcType);
      return RpcResolver(
        rpcLocation,
        [
          Resolver.object(
            metadata.contextualKeys
              .toSeq()
              .filter(childKey =>
                Input.isInputType(metadata.childTypeMap[childKey])
              )
              .map(childKey => [
                childKey,
                RpcResolver(rpcLocation.at(childKey)),
              ])
              .fromEntrySeq()
              .toObject()
          ),
        ],
        x => $ => $(x as {})
      );
    }
  );
}
