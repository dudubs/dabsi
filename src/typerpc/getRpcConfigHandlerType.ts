import { defined } from "@dabsi/common/object/defined";
import { Reflector } from "@dabsi/common/reflection/Reflector";
import { capitalize } from "@dabsi/common/string/capitalize";
import { getRpcMetadata } from "@dabsi/typerpc/getRpcMetadata";
import { RpcType } from "@dabsi/typerpc/Rpc";
import { RpcHandler } from "@dabsi/typerpc/RpcHandler";
import { RpcMembers } from "@dabsi/typerpc/RpcMembers";
import {
  AnyRpcWithConfig,
  RpcAnchorSymbol,
  RpcWithConfigSymbol,
} from "./RpcConfig";
import {
  RpcConfigHandlerType,
  RpcConfigHandlerTypeSymbol,
} from "./RpcConfigHandler";

export function getRpcConfigHandlerType<T extends AnyRpcWithConfig>(
  rpcType: RpcType<T>
): RpcConfigHandlerType<T, RpcHandler<T>>;

export function getRpcConfigHandlerType(rpcType: RpcType) {
  const handlerType = loadHandlerType();
  RpcMembers.freeze(rpcType);

  if (handlerType.rpcType !== rpcType) {
    const baseRpcType = rpcType;
    class newHandlerType extends handlerType {
      static readonly rpcType = baseRpcType;

      readonly rpcType = baseRpcType;
    }

    for (
      ;
      handlerType.rpcType !== rpcType;
      rpcType = Object.getPrototypeOf(rpcType)
    ) {
      const metadata = getRpcMetadata(rpcType);
      for (const memberKey of metadata.memberKeys) {
        const memberHandlerKey = "handle" + capitalize(memberKey);
        if (memberHandlerKey in newHandlerType.prototype) continue;

        newHandlerType.prototype[memberHandlerKey] = defined(
          newHandlerType.createRpcMemberHandler?.({
            rpcType: rpcType,
            type: metadata.memberTypeMap[memberKey],
            key: memberKey,
            propertyType: defined(
              Reflector.getPropertyType(rpcType, memberKey),
              () => `No propertyType for "${rpcType.name}.${memberKey}".`
            ),
          }),
          () => {
            return `No member handler for "${rpcType.name}.${memberKey}".`;
          }
        );
      }
    }

    Object.defineProperty(newHandlerType, "name", {
      configurable: false,
      value: handlerType.name + "*",
    });

    Object.defineProperty(baseRpcType, RpcConfigHandlerTypeSymbol, {
      enumerable: false,
      value: newHandlerType,
    });

    return newHandlerType;
  }

  return handlerType;

  function loadHandlerType(): RpcConfigHandlerType<AnyRpcWithConfig, {}> {
    const handlerType = rpcType[RpcConfigHandlerTypeSymbol];
    if (handlerType) {
      return handlerType;
    }
    const anchor = defined(
      rpcType[RpcAnchorSymbol] as any,
      () => `No rpc config metadata for "${rpcType.name}".`
    );

    let handlerModulePath;
    if (/[\\\/]rpc.ts$/.test(anchor.path)) {
      const pathWithoutBaseName = anchor.path.replace(/[^\\\/]+$/, "");
      handlerModulePath = pathWithoutBaseName + "handler.ts";
    } else {
      handlerModulePath = anchor.path.replace(
        /(?<name>[^\\\/])\.(?<ext>ts|js)$/,
        (...args) => {
          const { name, ext } = args[args.length - 1];
          return name + "Handler." + ext;
        }
      );
    }

    require(handlerModulePath);

    return defined(
      rpcType[RpcConfigHandlerTypeSymbol],
      () => `No rpc config handler for ${rpcType.name}.`
    );
  }
}
