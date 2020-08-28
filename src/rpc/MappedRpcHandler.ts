import {Awaitable, Union} from "../common/typings";
import {RpcError} from "./Rpc";

export type TMappedRpcHandlerMap = Record<string, (payload?: any) => any>;


export type MappedRpcHandler<T extends TMappedRpcHandlerMap> = {
    <P extends Union<{
        [K in keyof T]: [K, Parameters<T[K]>[0]]
    }>>(
        payload: P
    ): Promise<ReturnType<T[P[0]]>>

    <P extends Union<{
        [K in keyof T]:
        Parameters<T[K]>[0] extends undefined ? K :
            never
    }>>(
        payload: P
    ): Promise<ReturnType<T[P]>>

}

export type MappedRpcHandlerMap<C, T extends TMappedRpcHandlerMap> = {
    [K in keyof T]: (
        context: C,
        payload: Parameters<T[K]>[0],
    ) =>
        Awaitable<ReturnType<T[K]>>
};

export function MappedRpcHandler<C,
    T extends TMappedRpcHandlerMap>(
    handlers: {
        [K in keyof T]: (
            context: C,
            payload: Parameters<T[K]>[0],
        ) =>
            Awaitable<ReturnType<T[K]>>
    }
): (context: C) => MappedRpcHandler<T> {
    return context => async payload => {
        return handleMappedRpc(payload, handlers,
            (payload, handler) => handler(context, payload)
        );
    }
}

export function handleMappedRpc<T, K extends string & keyof T, U>(
    payload: K | [K, any],
    map: T,
    callback: (payload: any, item: T[K],key:string) => U
) {
    const [key, nextPayload] = typeof payload === "string" ? [payload, undefined] : payload;
    if (!map[key]){
        throw new RpcError(`No mapped key "${key}."`)
    }
    return callback(nextPayload, map[key],key);
}



