import {AnyRpc, Rpc, RpcConfig, RpcConnection, RpcHandlerFn, RpcPayload, RpcResult} from "./Rpc";


export type Parameter<D, V, R extends AnyRpc> = Rpc<{
    Handler:
        RpcHandlerFn<[D, RpcPayload<R>], RpcResult<R>>,
    Connection: {

        (data: D): RpcConnection<R>

    }, Config: {
        load(data: D): Promise<V>,
        target: (value: V) => RpcConfig<R>
    }
}>;

export function Parameter<D, V, T extends AnyRpc>(
    target: T
): Parameter<D, V, T> {
    return {
        createRpcConnection(handler) {
            return data => {
                return target.createRpcConnection(payload => {
                    return handler([data, payload])
                })
            }
        },
        createRpcHandler(config) {
            return async ([data, payload]) => {
                const value = await config.load(data);
                const handler = target.createRpcHandler(config.target(value))
                return handler(payload);
            }
        }
    }
}

