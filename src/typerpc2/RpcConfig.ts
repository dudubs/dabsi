import { CallStackAnchor } from "@dabsi/common/CallStackAnchor";
import { Rpc, RpcType } from "@dabsi/typerpc2";
import {
  ConfigFactory,
  Configurator,
  GenericConfig2,
} from "@dabsi/typerpc2/GenericConfig";
import { isHandlerSide } from "@dabsi/typerpc2/isHandlerSide";
import { RpcHandler, RpcWithHandler } from "@dabsi/typerpc2/RpcHandler";

export const RpcWithConfigSymbol = Symbol("RpcWithConfigSymbol");

export type InferredHandlerConfig<C> = C extends GenericConfig2<
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

export const RpcConfigMetadataMap = new WeakMap<
  RpcType,
  {
    anchor: CallStackAnchor;
  }
>();

export function RpcWithConfig(): { (rpcType: RpcType): void } {
  // TOOD: lock rpc for new members by bases.

  if (!isHandlerSide()) {
    return () => {};
  }
  const anchor = CallStackAnchor.capture(RpcWithConfig);
  return function (rpcType: RpcType) {
    Object.defineProperty(rpcType, RpcWithConfigSymbol, {
      value: true,
      enumerable: false,
    });
    RpcConfigMetadataMap.set(rpcType, { anchor });
  };
}

export type RpcConfigurator<T extends Rpc> = T extends AnyRpcWithConfig
  ? Configurator<InferredRpcConfig<T>>
  : ConfigFactory<RpcHandler<T>>;

export function isRpcTypeWithConfig(
  rpcType: RpcType
): rpcType is RpcType<AnyRpcWithConfig> {
  return rpcType[RpcWithConfigSymbol] === true;
}
