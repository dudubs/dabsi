import { mapArrayToObject } from "../../common/array/mapArrayToObject";
import { Awaitable, Awaited } from "../../common/typings2/Async";
import { Fn } from "../../common/typings2/Fn";
import { RpcFnHandler } from "./RpcFnHandler";
import { Rpc } from "../Rpc";

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
    isConfigFn: true,
    handler: RpcFnHandler,
    connect(path, command) {
      return async (...payload) => {
        return <Awaited<ReturnType<T>>>await command(path, payload);
      };
    },
  });
}
