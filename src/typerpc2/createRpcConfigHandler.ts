import createRpcConfig from "@dabsi/typerpc2/createRpcConfig";
import { GenericConfig } from "@dabsi/typerpc2/GenericConfig";
import { getRpcConfigHandlerType } from "@dabsi/typerpc2/getRpcConfigHandlerType";
import { Rpc, RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcError } from "@dabsi/typerpc2/RpcError";
import { RpcHandler } from "@dabsi/typerpc2/RpcHandler";
import { AnyRpcWithConfig, RpcConfigurator, RpcWithConfig } from "./RpcConfig";

// TODO: make async
export async function createRpcConfigHandler<T extends AnyRpcWithConfig>(
  rpcType: RpcType<T>,
  rpcConfigurator: RpcConfigurator<T>
): Promise<RpcHandler<T>>;

export async function createRpcConfigHandler(
  rpcType:
    | RpcType<Rpc & RpcWithConfig<Rpc, GenericConfig<(...args) => any>>>
    | RpcType<AnyRpcWithConfig>,
  rpcConfigurator: RpcConfigurator<AnyRpcWithConfig>
) {
  const rpcConfigHandlerType = getRpcConfigHandlerType(rpcType);

  if (rpcConfigurator == null) {
    return new rpcConfigHandlerType({});
  }

  return new rpcConfigHandlerType(
    (await createRpcConfig(rpcType, rpcConfigurator)) ?? {}
  );
}
