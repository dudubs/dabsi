import {AnyRpc, Rpc, RpcConfigType, RpcConnectionType, RpcHandler, RpcPayloadType, RpcResultType} from "./Rpc";


export type Parameter<D, V, R extends AnyRpc> = Rpc<{
    Handler:
        RpcHandler<[D, RpcPayloadType<R>], RpcResultType<R>>,
    Connection: {

        (data: D): RpcConnectionType<R>

    }, Config: {
        load(data: D): Promise<V>,
        target: (value: V) => RpcConfigType<R>
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

