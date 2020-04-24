import {RPC} from "./RPC";
import {fetchRPC} from "./RPCHandler";

export type Command<T, R> = RPC<(params: T) => Promise<R>> & {
    validateParams?: (params) => params is T
};


export type AnyCommand<T = any, P = any> = Command<T, P>;
export type Commands = Record<string, AnyCommand>;


export type CommandParams<T extends AnyCommand> =
    T extends AnyCommand<infer U> ? U : never;

export type CommandResult<T extends AnyCommand> =
    T extends AnyCommand<any, infer U> ? U : never;

export function Command<T = void, R = void>(
    validateParams?: Command<T, R>['validateParams']
): Command<T, R> {
    return {
        validateParams,
        connect: connection => {
            return params => connection(params).then(fetchRPC)
        }
    }
}


