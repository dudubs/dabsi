import {Awaitable} from "../common/typings";
import {Rpc, RpcHandler} from "./Rpc";

export type Command<U extends any[], R> =
    Rpc<RpcHandler<U, R>,
        (...args: U) => Promise<R>,
        (...args: U) => Awaitable<R>>


export function Command<U = void, R = void>():
    Command<U extends any[] ? U : [U], R> {
    return {
        connect: handler => async function (...args) {
            return handler.call(this, args);
        },
        handle: adapter => async function (payload: any[]) {
            return await adapter.apply(this, payload);
        }
    }
}





