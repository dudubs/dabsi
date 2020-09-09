import {AsyncFn, Awaitable, Fn} from "../common/typings";
import {Rpc, RpcHandlerFn} from "./Rpc";


export type Command<T extends Fn> = Rpc<{
    Handler: RpcHandlerFn<Parameters<T>, ReturnType<T>>
    Connection: (...args: Parameters<T>) => Promise<ReturnType<T>>
    Config: (...args: Parameters<T>) => Awaitable<ReturnType<T>>
}>

export function Command<T extends Fn>():
    Command<T> {
    return {
        createRpcConnection: handler => async function (this: any, ...args) {
            return handler.call(this, args);
        },
        createRpcHandler: adapter => async function (this: any, payload: any[]) {
            return await adapter.apply(this, payload);
        }
    }
}
