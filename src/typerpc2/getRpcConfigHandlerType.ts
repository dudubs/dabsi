import { defined } from "@dabsi/common/object/defined";
import { Reflector } from "@dabsi/common/reflection/Reflector";
import { capitalize } from "@dabsi/common/string/capitalize";
import { getRpcMetadata } from "@dabsi/typerpc2/getRpcMetadata";
import { RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcHandler } from "@dabsi/typerpc2/RpcHandler";
import { RpcMembers } from "@dabsi/typerpc2/RpcMembers";
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
      for (const memberKey of RpcMembers.getKeys(rpcType)) {
        const memberHandlerKey = "handle" + capitalize(memberKey);
        if (memberHandlerKey in newHandlerType.prototype) continue;
        const memberType = RpcMembers.getMemberType(rpcType, memberKey);
        const memberPropertyType = Reflector.getPropertyType(
          rpcType,
          memberKey
        );

        newHandlerType.prototype[memberHandlerKey] = defined(
          newHandlerType.createRpcMemberHandler?.(
            memberKey,
            memberType!,
            memberPropertyType!
          ),
          () => `No member handler for "${rpcType.name}.${memberKey}".`
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
    const pathWithoutBaseName = anchor.path.replace(/[^\\\/]+$/, "");

    require(pathWithoutBaseName + "handler.ts");

    return defined(
      rpcType[RpcConfigHandlerTypeSymbol],
      () => `No rpc config handler for ${rpcType.name}.`
    );
  }
}
