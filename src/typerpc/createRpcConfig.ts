import { GenericConfig } from "@dabsi/typerpc/GenericConfig";
import { getRpcConfigHandlerType } from "@dabsi/typerpc/getRpcConfigHandlerType";
import { RpcType } from "@dabsi/typerpc/Rpc";
import { InferredRpcConfig } from "@dabsi/typerpc/RpcConfig";
import { RpcError } from "@dabsi/typerpc/RpcError";
import { AnyRpcWithConfig, RpcConfigurator } from "./RpcConfig";

export default function createRpcConfig<T extends AnyRpcWithConfig>(
  rpcType: RpcType<T>,
  rpcConfigurator: RpcConfigurator<T>
): Promise<InferredRpcConfig<T>>;
export default async function createRpcConfig(rpcType, rpcConfigurator) {
  const rpcConfigHandlerType = getRpcConfigHandlerType(rpcType);

  if (rpcConfigurator == null) {
    return {};
  }

  let rpcConfig;

  switch (rpcConfigHandlerType.rpcConfigType) {
    case "REGULAR":
      {
        if (typeof rpcConfigurator === "function") {
          rpcConfig = await GenericConfig(
            rpcConfigurator as GenericConfig<(config: any) => any>
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
      rpcConfig = await GenericConfig(
        rpcConfigurator as GenericConfig<(...args) => any>,
        rpcConfigHandlerType.resolveRpcGenericConfig!
      );
      break;
    default:
      throw new RpcError(
        `Invalid config type ${rpcConfigHandlerType.rpcConfigType}`
      );
  }

  rpcConfig ??= {};

  if (rpcConfigHandlerType.resolveRpcHandlerConfig) {
    rpcConfig = await rpcConfigHandlerType.resolveRpcHandlerConfig(
      rpcType,
      rpcConfig
    );
  }

  return rpcConfig;
}
