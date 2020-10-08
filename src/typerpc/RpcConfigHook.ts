import { OmitRequiredKeys } from "../data/DataExp";
import { AnyRpc, RpcConfig, RpcHook } from "./Rpc";
import { RpcConfigurator } from "./RpcConfigurator";

export type RpcConfigHook<T extends AnyRpc, C, MT = {}> = OmitRequiredKeys<
  T,
  AnyRpc
> &
  RpcHook<
    T,
    {
      Config: C;
    },
    MT
  >;
export const baseGetConfigProp = "rpcConfigHook.getConfig";

// RpcConfigHook
export function RpcConfigHook<T extends AnyRpc, C>(
  target: T,
  getConfig: (config: C, target: T) => RpcConfig<T>
): RpcConfigurator<T, C> {
  const baseGetConfig = target.createRpcHandler[baseGetConfigProp];

  if (baseGetConfig) {
    return RpcConfigHook(Object.getPrototypeOf(target), config =>
      getConfig(baseGetConfig(config), target)
    );
  }

  createRpcHandler[baseGetConfigProp] = getConfig;

  return Object.setPrototypeOf({ createRpcHandler }, target);

  function createRpcHandler(this, config) {
    return target.createRpcHandler.call(this, getConfig(config, this));
  }
}
