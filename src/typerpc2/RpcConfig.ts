import { CallStackAnchor } from "@dabsi/common/CallStackAnchor";
import { Rpc, RpcType } from "@dabsi/typerpc2";
import { GenericConfigOrFactory } from "@dabsi/typerpc2/GenericConfig";
import { isHandlerSide } from "@dabsi/typerpc2/isHandlerSide";
import { RpcWithHandler } from "@dabsi/typerpc2/RpcHandler";

export declare const RpcConfigSymbol: unique symbol;

export type RpcWithConfig<T, H = {}> = Record<typeof RpcConfigSymbol, T> &
  RpcWithHandler<H>;

export type InferredRpcConfig<
  T extends RpcWithConfig<any>
> = T[typeof RpcConfigSymbol];

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
    RpcConfigMetadataMap.set(rpcType, { anchor });
  };
}

export type GenericConfigOrFactory<
  T extends AnyRpcWithConfig
> = GenericConfigOrFactory<InferredRpcConfig<T>>;
