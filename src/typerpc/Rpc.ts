import { MetaType, MetaTypeHook, WithMetaType } from "../common/MetaType";
import { Awaitable, If, Is, IsUndefined } from "../common/typings";

export type RpcHandlerFn<Payload = any, Result = any> = {
  (payload: Payload): Promise<Result>;
};

export type TRpc = {
  Handler: RpcHandlerFn;
  Connection: any;
  Config: any;
};

export type Rpc<T extends TRpc> = WithMetaType<{
  TRpc: T;
}> & {
  createRpcConnection(handler: T["Handler"]): T["Connection"];

  createRpcHandler(config: T["Config"]): T["Handler"];
};

export type RpcType<T extends AnyRpc> = MetaType<T>["TRpc"];

export type RpcHook<
  R extends AnyRpc,
  T extends Partial<TRpc>,
  MT = {}
> = MetaTypeHook<R, AnyRpc, MT> &
  Rpc<Extract<Omit<RpcType<R>, keyof T> & T, TRpc>>;

export type AnyRpc = Rpc<{
  Handler: RpcHandlerFn;
  Connection: any;
  Config: any;
}>;

export type RpcPayload<T extends AnyRpc> = any;
// RpcHandler<T> extends RpcHandlerFn<infer U, any> ? U : never;

export type RpcResult<T extends AnyRpc> = any;
// RpcHandler<T> extends RpcHandlerFn<any, infer U> ? U : never;

export type RpcHandler<T extends AnyRpc> = RpcType<T>["Handler"];

export type RpcConnection<T extends AnyRpc> = RpcType<T>["Connection"];

export type RpcConfig<T extends AnyRpc> = RpcType<T>["Config"];

export type RpcUndefinedConfig<T extends AnyRpc> = If<
  IsUndefined<RpcConfig<T>>,
  undefined
>;

export function createRpcConnection<T extends AnyRpc>(
  rpc: T,
  config: RpcConfig<T>
): RpcConnection<T> {
  return rpc.createRpcConnection(rpc.createRpcHandler(config));
}

export class RpcError extends Error {}

export function RpcConfig<T extends AnyRpc>(
  rpc: T,
  config: RpcConfig<T>
): RpcConfig<T> {
  return config;
}

export function Rpc<Payload, Result, Config, Connection>(
  createConnection: (
    handler: (payload: Payload) => Promise<Result>
  ) => Connection,
  handle: (config: Config, payload: Payload) => Awaitable<Result>
): Rpc<{
  Handler: RpcHandlerFn<Payload, Result>;
  Config: Config;
  Connection: Connection;
}> {
  return {
    createRpcConnection(handler) {
      return createConnection(handler);
    },
    createRpcHandler(config) {
      return async (payload) => handle(config, payload);
    },
  };
}
