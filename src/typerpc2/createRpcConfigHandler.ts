import { GenericConfig2 } from "@dabsi/typerpc2/GenericConfig";
import { getRpcWithConfigHandlerType } from "@dabsi/typerpc2/getRpcWithConfigHandlerType";
import { Rpc, RpcType } from "@dabsi/typerpc2/Rpc";
import { BaseRpcConfigHandler } from "@dabsi/typerpc2/RpcConfigHandler";
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
    | RpcType<Rpc & RpcWithConfig<Rpc, GenericConfig2<(...args) => any>>>
    | RpcType<AnyRpcWithConfig>,
  rpcConfigurator: RpcConfigurator<AnyRpcWithConfig>
) {
  const rpcConfigHandlerType = getRpcWithConfigHandlerType(rpcType);

  if (rpcConfigurator == null) {
    return new rpcConfigHandlerType({}, <any>{});
  }

  const originalRpcConfigurator = rpcConfigurator;

  if (rpcConfigHandlerType.resolveRpcHandlerConfig) {
    rpcConfigurator = rpcConfigHandlerType.resolveRpcHandlerConfig(
      rpcConfigurator
    );
  }

  let rpcConfig;

  switch (rpcConfigHandlerType.rpcConfigType) {
    case "REGULAR":
      {
        if (typeof rpcConfigurator === "function") {
          rpcConfig = await GenericConfig2(
            rpcConfigurator as GenericConfig2<(config: any) => any>
          );
        } else {
          rpcConfig = rpcConfigurator;
        }
      }
      break;
    case "FUNCTION":
      rpcConfig = rpcConfigurator;
      break;
    case "GENERIC":
      rpcConfig = await GenericConfig2(
        rpcConfigurator as GenericConfig2<(...args) => any>,
        rpcConfigHandlerType.resolveRpcGenericConfig!
      );
      break;
    default:
      throw new RpcError(
        `Invalid config type ${rpcConfigHandlerType.rpcConfigType}`
      );
  }

  return new rpcConfigHandlerType(rpcConfig ?? {}, originalRpcConfigurator);
}
