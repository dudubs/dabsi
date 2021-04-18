import { createRpcCommandFromHandler } from "@dabsi/typerpc2/createRpcCommandFromHandler";
import { createRpcHandlerFromConfig } from "./createRpcHandlerFromConfig";
import { AnyRpcTypeWithConfig, InferredRpcConfig } from "./RpcConfig";

export function createRpcFromConfig<T extends AnyRpcTypeWithConfig>(
  rpcType: T,
  config: InferredRpcConfig<InstanceType<T>>
): InstanceType<T> {
  const handler = createRpcHandlerFromConfig(rpcType, config);
  const command = createRpcCommandFromHandler(rpcType, handler);
  return <InstanceType<T>>new rpcType([], command);
}
