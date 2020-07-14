import {Awaitable} from "../common/typings";
import {RPC, RPCHandler} from "./RPC";

export type Command<U extends any[], R> =
    RPC<RPCHandler<U, R>,
        (...args: U) => Promise<R>,
        (...args: U) => Awaitable<R>>


export function Command<U = void, R = void>():
    Command<U extends any[] ? U : [U], R> {
    return {
        connect: handler => async function (...args) {
            return handler.call(this, args);
        },
        handle: handler => async function (payload: any[]) {
            return await handler.apply(this, payload);
        }
    }
}





