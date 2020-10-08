import { AnyRpc, RpcConfig, RpcHandler } from "./Rpc";
import { AnyRpcWithGenericConfig, RpcGenericConfig } from "./RpcGenericConfig";

export type RpcHandlerFactory<T extends AnyRpc> = (
  this: T,
  config: RpcConfig<T>
) => RpcHandler<T>;

export function RpcHandlerFactory<T extends AnyRpc>(
  factory: RpcHandlerFactory<T>
): RpcHandlerFactory<T> {
  return factory;
}

RpcHandlerFactory.Generic = function <T extends AnyRpcWithGenericConfig>(
  factory: (this: T, config: ReturnType<RpcConfig<T>>) => RpcHandler<T>
): RpcHandlerFactory<T> {
  return function (config) {
    if (typeof config === "function") {
      config = RpcGenericConfig(config);
    }
    return factory.call(this, config);
  };
};
