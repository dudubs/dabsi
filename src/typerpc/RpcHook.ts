import { Awaitable } from "@dabsi/common/typings2/Async";
import { Call } from "@dabsi/common/typings2/Call";
import { Override } from "@dabsi/common/typings2/Override";
import {
  AnyRpc,
  AnyRpcHandler,
  BasedRpc,
  Rpc,
  RpcResolvedHandler,
  RpcType,
  TRpc,
} from "@dabsi/typerpc/Rpc";

const hookConfigMapSymbol = Symbol();
export type RpcHookHandler<T extends AnyRpc> = {
  symbol: symbol;
  resolveConfig(config, configHook): Awaitable<[config: any, configHook: any]>;
  getHandler(
    handler: RpcResolvedHandler<T>,
    configHook: any
  ): Awaitable<RpcResolvedHandler<T> | void>;
};

export type RpcHook<R extends BasedRpc, T extends Partial<TRpc>> = Rpc<
  Extract<Override<RpcType<R>, T>, TRpc>
>;

export function RpcHook<T extends AnyRpc>(
  rpc: T,
  { resolveConfig, getHandler, symbol }: RpcHookHandler<T>
): AnyRpc {
  if (rpc[symbol]) return rpc;
  return Object.setPrototypeOf(
    {
      [symbol]: true,
      async resolveRpcConfig(config) {
        const hookConfigMap = config?.[hookConfigMapSymbol];
        let hookConfig = hookConfigMap?.[symbol];

        [config, hookConfig] = await resolveConfig(config, hookConfig);

        config = await (rpc.resolveRpcConfig.call as Call<
          typeof rpc.resolveRpcConfig
        >)(this, config);

        config[hookConfigMapSymbol] = {
          ...hookConfigMap,
          [symbol]: hookConfig,
        };
        return config;
      },
      async createRpcHandler(config, parent) {
        let handler: any = await (rpc.createRpcHandler.call as Call<
          typeof rpc.createRpcHandler
        >)(this, config, parent);
        const configHook = config[hookConfigMapSymbol][symbol];
        if (configHook !== undefined) {
          handler =
            (await getHandler(handler as RpcResolvedHandler<T>, configHook)) ??
            handler;
        }
        return handler;
      },
    },
    rpc
  );
}
