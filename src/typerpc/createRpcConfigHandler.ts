import createRpcConfig from "@dabsi/typerpc/createRpcConfig";
import { GenericConfig } from "@dabsi/typerpc/GenericConfig";
import { getRpcConfigHandlerType } from "@dabsi/typerpc/getRpcConfigHandlerType";
import { Rpc, RpcType } from "@dabsi/typerpc/Rpc";
import { RpcError } from "@dabsi/typerpc/RpcError";
import { RpcHandler } from "@dabsi/typerpc/RpcHandler";
import { AnyRpcWithConfig, RpcConfigurator, RpcWithConfig } from "./RpcConfig";

// TODO: make async
export default async function createRpcConfigHandler<
  T extends AnyRpcWithConfig
>(
  rpcType: RpcType<T>,
  rpcConfigurator: RpcConfigurator<T>
): Promise<RpcHandler<T>>;

export default async function createRpcConfigHandler(
  rpcType:
    | RpcType<Rpc & RpcWithConfig<Rpc, GenericConfig<(...args) => any>>>
    | RpcType<AnyRpcWithConfig>,
  rpcConfigurator: RpcConfigurator<AnyRpcWithConfig>
) {
  const rpcConfigHandlerType = getRpcConfigHandlerType(rpcType);

  if (rpcConfigurator == null) {
    return new rpcConfigHandlerType(rpcType, {});
  }

  return new rpcConfigHandlerType(
    rpcType,
    (await createRpcConfig(rpcType, rpcConfigurator)) ?? {}
  );
}
