import { defined } from "@dabsi/common/object/defined";
import { values } from "@dabsi/common/object/values";
import { RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcError } from "@dabsi/typerpc2/RpcError";
import { RpcHandler } from "@dabsi/typerpc2/RpcHandler";
import { AnyRpcWithConfig, RpcConfigMetadataMap } from "./RpcConfig";
import {
  BaseRpcConfigHandler,
  RpcConfigHandlerMap,
  RpcConfigHandlerType,
} from "./RpcConfigHandler";

export function getRpcWithConfigHandlerType<T extends AnyRpcWithConfig>(
  rpcType: RpcType<T>
): RpcConfigHandlerType<T, RpcHandler<T>>;

export function getRpcWithConfigHandlerType(rpcType: RpcType) {
  const metadata = defined(
    RpcConfigMetadataMap.get(rpcType),
    () => `No rpc config metadata for "${rpcType.name}".`
  );
  const pathWithoutBaseName = metadata.anchor.path.replace(/[^\\\/]+$/, "");

  require(pathWithoutBaseName + "handler.ts");

  const handlerType = RpcConfigHandlerMap.get(rpcType);
  if (!handlerType) {
    throw new Error(`No rpc-config-handler for ${rpcType.name}.`);
  }
  return handlerType!;
}
