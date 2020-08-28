import {Awaitable} from "../common/typings";
import {Rpc, RpcHandler} from "./Rpc";

export type Command<U extends any[], R> = Rpc<{
    Handler: RpcHandler<U, R>,
    Connection: (...args: U) => Promise<R>,
    Config: (...args: U) => Awaitable<R>
}>


export function Command<U = void, R = void>():
    Command<U extends any[] ? U : [U], R> {
    return {
        createRpcConnection: handler => async function (...args) {
            return handler.call(this, args);
        },
        createRpcHandler: adapter => async function (payload: any[]) {
            return await adapter.apply(this, payload);
        }
    }
}





