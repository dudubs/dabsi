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
        connect(handler) {
            return data => {
                return target.connect(payload => {
                    return handler([data, payload])
                })
            }
        },
        handle(config) {
            return async ([data, payload]) => {
                const value = await config.load(data);
                const handler = target.handle(config.target(value))
                return handler(payload);
            }
        }
    }
}

