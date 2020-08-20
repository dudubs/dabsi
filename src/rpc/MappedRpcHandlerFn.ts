import {Awaitable, Union} from "../common/typings";
import {AnyRpc, RpcConfigType, RpcError, RpcHandlerType} from "./Rpc";

export type TMappedRpcHandlerFn = Record<string, (payload?: any) => any>;

export type MappedRpcHandlerFn<T extends TMappedRpcHandlerFn> = {
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


export function MappedRpcHandlerFn<R extends AnyRpc,
    T extends TMappedRpcHandlerFn>(
    handlers: {
        [K in keyof T]: (
            this: R,
            config: RpcConfigType<R>,
            payload: Parameters<T[K]>[0]) =>
            Awaitable<ReturnType<T[K]>>
    }
): (this: R, config: RpcConfigType<R>) => RpcHandlerType<R> {
    return function (config) {
        return async payload => {
            let key;
            if (typeof payload === "string") {
                [key, payload] = [payload, undefined];
            } else {
                [key, payload] = payload;
            }
            const handler = handlers[key];
            if (!handler)
                throw new RpcError(`No handler type "${key}".`);
            return handler.call(this, config, payload)
        }
    }
}


