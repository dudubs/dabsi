import { Awaitable } from "../common/typings2/Async";
import { Call } from "../common/typings2/Call";
import { Override } from "../common/typings2/Override";
import {
  AnyRpc,
  BasedRpc,
  Rpc,
  RpcResolvedHandler,
  RpcType,
  TRpc,
} from "./Rpc";

const configHooksSymbol = Symbol();

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
) {
  if (rpc[configHooksSymbol]?.[symbol] !== undefined) return rpc;
  return Object.setPrototypeOf(rpc, {
    async resolveRpcConfig(config) {
      const configHooks = config[configHooksSymbol];
      let configHook = configHooks?.[symbol];
      [config, configHook] = await resolveConfig(config, configHook);
      config = (rpc.resolveRpcConfig.call as Call<typeof rpc.resolveRpcConfig>)(
        this,
        config
      );
      if (configHook !== undefined) {
        config[configHooksSymbol] = {
          ...configHooks,
          [symbol]: configHook,
        };
      }
      return config;
    },
    async createRpcHandler(config, parent) {
      const handler = await (rpc.createRpcHandler.call as Call<
        typeof rpc.createRpcHandler
      >)(this, config, parent);

      const configHook = config[configHooksSymbol][symbol];
      if (config === undefined) return handler;
      return (
        getHandler(handler as RpcResolvedHandler<T>, configHook) ?? handler
      );
    },
  });
}
