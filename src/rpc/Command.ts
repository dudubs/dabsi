import {Awaitable} from "../common/typings";
import {RPC, RPCHandler} from "./RPC";

export type Command<U extends any[], R> =
    RPC<RPCHandler<U, R>,
        (...args: U) => Awaitable<R>,
        (...args: U) => Awaitable<R>>


export function Command<U=void, R = void>():
    Command<U extends any[] ? U : [U], R> {
    return {
        connect: handler => async (...args) => handler(args),
        handle: handler => async function (data) {
            return handler.apply(this, data);
        }
    }
}
