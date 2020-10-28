import { Awaitable, Awaited, Fn } from "../../common/typings";
import { RpcFnHandler } from "./RpcFnHandler";
import { Rpc } from "../Rpc";

export type RpcFn<T extends Fn> = Rpc<{
  Connection: (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>;
  Props: {};
  Config: (...args: Parameters<T>) => Awaitable<Awaited<ReturnType<T>>>;
  Handler: {};
}>;

export type AnyRpcFn = RpcFn<Fn>;

export function RpcFn<T extends Fn = () => void>(): RpcFn<T> {
  return <any>Rpc<AnyRpcFn>({
    isGenericConfig: false,
    handler: RpcFnHandler,
    connect(handler) {
      return async (...args) => <Awaited<ReturnType<T>>>await handler(args);
    },
  });
}
