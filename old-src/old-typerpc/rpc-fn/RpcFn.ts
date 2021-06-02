import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { Awaitable, Awaited } from "@dabsi/common/typings2/Async";
import { Fn } from "@dabsi/common/typings2/Fn";
import { RpcFnHandler } from "@dabsi/old-typerpc/rpc-fn/RpcFnHandler";
import { Rpc } from "@dabsi/old-typerpc/Rpc";

export type RpcFn<T extends Fn> = Rpc<{
  Connection: (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>;
  Props: {};
  Children: {};
  Config: (...args: Parameters<T>) => Awaitable<Awaited<ReturnType<T>>>;
  Handler: {};
  Payload: any[];
}>;

export type AnyRpcFn = RpcFn<Fn>;
export type RpcFnMap<T extends Record<string, Fn>> = {
  [K in keyof T]: RpcFn<T[K]>;
};

export function RpcFnMap<K extends string>(...keys: K[]): Record<K, RpcFn<Fn>> {
  return mapArrayToObject(keys, key => [key, RpcFn<Fn>()]);
}

export function RpcFn<T extends Fn = () => void>(): RpcFn<T> {
  return <any>Rpc<AnyRpcFn>({
    isGenericConfig: false,
    type: RpcFn,
    isConfigFn: true,
    handler: RpcFnHandler,
    connect(path, command) {
      return async (...payload) => {
        return <Awaited<ReturnType<T>>>await command(path, payload);
      };
    },
  });
}
