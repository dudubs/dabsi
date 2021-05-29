import { CallStackAnchor } from "@dabsi/common/CallStackAnchor";
import { Rpc, RpcType } from "@dabsi/typerpc2";
import {
  ConfigFactory,
  Configurator,
  GenericConfig,
} from "@dabsi/typerpc2/GenericConfig";
import isHandlingSide from "@dabsi/typerpc2/isHandlingSide";
import { RpcHandler, RpcWithHandler } from "@dabsi/typerpc2/RpcHandler";

export const RpcWithConfigSymbol = Symbol("RpcWithConfigSymbol");

export type InferredHandlerConfig<C> = C extends GenericConfig<
  (...args) => infer U,
  any
>
  ? U
  : C;

export type RpcWithConfig<C, H = {}, HC = InferredHandlerConfig<C>> = Record<
  typeof RpcWithConfigSymbol,
  C
> &
  RpcWithHandler<H & { config: HC }>;

export type InferredRpcConfig<
  T extends RpcWithConfig<any>
> = T[typeof RpcWithConfigSymbol];

export type AnyRpcWithConfig<C = any, R extends Rpc = Rpc> = R &
  RpcWithConfig<C>;

export type AnyRpcTypeWithConfig<T = any, R extends Rpc = Rpc> = RpcType<
  R & RpcWithConfig<T>
>;
export const RpcAnchorSymbol = Symbol("RpcAnchor");
export function RpcWithConfig(): { (rpcType: RpcType): void } {
  if (!isHandlingSide()) {
    return () => {};
  }
  const anchor = CallStackAnchor.capture(RpcWithConfig);
  return function (rpcType: RpcType) {
    Object.defineProperty(rpcType, RpcWithConfigSymbol, {
      value: true,
      enumerable: false,
    });
    Object.defineProperty(rpcType, RpcAnchorSymbol, {
      value: anchor,
    });
  };
}

export type RpcConfigurator<T extends Rpc> = T extends AnyRpcWithConfig
  ? Configurator<InferredRpcConfig<T>>
  : ConfigFactory<RpcHandler<T>, [RpcType<T>]> | RpcHandler<T>;

export function isRpcTypeWithConfig(
  rpcType: any
): rpcType is RpcType<AnyRpcWithConfig> {
  return rpcType[RpcWithConfigSymbol] !== undefined;
}
