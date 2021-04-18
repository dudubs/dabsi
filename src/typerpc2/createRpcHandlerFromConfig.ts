import { GenericConfig2 } from "@dabsi/typerpc2/GenericConfig";
import { getRpcWithConfigHandlerType } from "@dabsi/typerpc2/getRpcWithConfigHandlerType";
import { Rpc, RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcConfigType } from "@dabsi/typerpc2/RpcConfigHandler";
import { RpcHandler } from "@dabsi/typerpc2/RpcHandler";
import {
  AnyRpcTypeWithConfig,
  AnyRpcWithConfig,
  InferredRpcConfig,
  GenericConfigOrFactory,
  RpcWithConfig,
} from "./RpcConfig";

// TODO: make async
export async function createRpcHandlerFromConfig<T extends AnyRpcWithConfig>(
  rpcType: RpcType<T>,
  rpcGenericConfigOrFactory: GenericConfigOrFactory<T>
): Promise<RpcHandler<T>>;
export async function createRpcHandlerFromConfig(
  rpcType:
    | RpcType<Rpc & RpcWithConfig<GenericConfig2<(...args) => any>>>
    | RpcType<AnyRpcWithConfig>,
  rpcGenericConfigOrFactory
) {
  const handlerType = getRpcWithConfigHandlerType(rpcType);

  let config;

  switch (handlerType.rpcConfigType) {
    case "REGULAR":
      {
        if (typeof rpcGenericConfigOrFactory === "function") {
          config = await GenericConfig2(
            rpcGenericConfigOrFactory as GenericConfig2<(config: any) => any>
          );
        } else {
          config = rpcGenericConfigOrFactory;
        }
      }
      break;
    case "FUNCATION":
      config = rpcGenericConfigOrFactory;
      break;
    case "GENERIC":
      config = await GenericConfig2(
        rpcGenericConfigOrFactory as GenericConfig2<(...args) => any>,
        handlerType.rpcConfigResolve!
      );
      break;
  }

  return new handlerType(config);
}
