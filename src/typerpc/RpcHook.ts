import { Awaitable } from "@dabsi/common/typings2/Async";
import { Call } from "@dabsi/common/typings2/Call";
import { Override } from "@dabsi/common/typings2/Override";
import {
  AnyRpc,
  BasedRpc,
  Rpc,
  RpcResolvedHandler,
  RpcType,
  TRpc,
} from "@dabsi/typerpc/Rpc";

const globalSymbol = Symbol();

export type RpcHookHandler<T extends AnyRpc, HC = any> = {
  symbol: symbol;

  resolveHookConfig(
    config,
    prevConfigHook: HC | undefined
  ): Awaitable<[config: any, configHook: HC | undefined]>;

  mergeHookConfig?(prevHookConfig: HC, nextHookConfig: HC): HC;

  installHook(
    handler: RpcResolvedHandler<T>,
    configHook: any
  ): Awaitable<RpcResolvedHandler<T> | void>;
};

export type RpcHook<R extends BasedRpc, T extends Partial<TRpc>> = Rpc<
  Extract<Override<RpcType<R>, T>, TRpc>
>;

export function RpcHook<T extends AnyRpc>(
  rpc: T,
  { resolveHookConfig, installHook, symbol, mergeHookConfig }: RpcHookHandler<T>
): AnyRpc {
  if (rpc[symbol]) return rpc;
  return Object.setPrototypeOf(
    {
      [symbol]: true,
      async resolveRpcConfig(unrsolvedConfig) {
        const hookConfigMap = unrsolvedConfig?.[globalSymbol];
        const prevHookConfig = hookConfigMap?.[symbol];
        let nextHookConfig;

        [unrsolvedConfig, nextHookConfig] = await resolveHookConfig(
          unrsolvedConfig,
          prevHookConfig
        );

        const resolvedConfig = await (rpc.resolveRpcConfig.call as Call<
          typeof rpc.resolveRpcConfig
        >)(this, unrsolvedConfig);

        if (nextHookConfig !== undefined) {
          if (mergeHookConfig && prevHookConfig !== undefined) {
            nextHookConfig = mergeHookConfig(prevHookConfig, nextHookConfig);
          }

          resolvedConfig[globalSymbol] = {
            ...hookConfigMap,
            [symbol]: nextHookConfig,
          };
        }

        return resolvedConfig;
      },
      async createRpcHandler(config, parent) {
        let handler: any = await (rpc.createRpcHandler.call as Call<
          typeof rpc.createRpcHandler
        >)(this, config, parent);
        const hookConfig = config[globalSymbol]?.[symbol];
        if (hookConfig !== undefined) {
          handler =
            (await installHook(handler as RpcResolvedHandler<T>, hookConfig)) ??
            handler;
        }
        return handler;
      },
    },
    rpc
  );
}
