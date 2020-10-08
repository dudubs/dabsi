import { touchMap } from "../common/map/touchMap";
import { AnyRpc, RpcConfig } from "./Rpc";
import { RpcConfigurator } from "./RpcConfigurator";
import { AsyncConfigFactory } from "./RpcGenericConfig";

export function RpcContext<T extends AnyRpc>(
  rpc: T
): RpcConfigurator<T, AsyncConfigFactory<T, RpcConfig<T>>> {
  const cache = new WeakMap();
  return Object.setPrototypeOf(
    {
      createRpcHandler(getAwaitableConfig) {
        return async (payload) => {
          const handler = await touchMap(cache, getAwaitableConfig, async () =>
            rpc.createRpcHandler.call(
              this,
              await AsyncConfigFactory(getAwaitableConfig, rpc)
            )
          );
          return handler(payload);
        };
      },
    },
    rpc
  );
}
