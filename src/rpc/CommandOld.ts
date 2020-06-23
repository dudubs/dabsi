import {RPCOld} from "./RPCOld";
import {fetchRPC} from "./RPCHandler";

export type CommandOld<T, R> = RPCOld<(params: T) => Promise<R>> & {
    validateParams?: (params) => params is T
};


export type AnyCommandOld<T = any, P = any> = CommandOld<T, P>;


export type CommandParamsOld<T extends AnyCommandOld> =
    T extends AnyCommandOld<infer U> ? U : never;

export type CommandResultOld<T extends AnyCommandOld> =
    T extends AnyCommandOld<any, infer U> ? U : never;

export function CommandOld<T = void, R = void>(
    validateParams?: CommandOld<T, R>['validateParams']
): CommandOld<T, R> {
    return {
        validateParams,
        connect: connection => {
            return params => connection(params).then(fetchRPC)
        }
    }
}


