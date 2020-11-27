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
}>;

export type AnyRpcFn = RpcFn<Fn>;

export function RpcFn<T extends Fn = () => void>(): RpcFn<T> {
  return <any>Rpc<AnyRpcFn>({
    isGenericConfig: false,
    isConfigFn: true,
    handler: RpcFnHandler,
    connect(path, command) {
      return async (...args) =>
        <Awaited<ReturnType<T>>>await command(path, args);
    },
  });
}
