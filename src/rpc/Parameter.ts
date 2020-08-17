import {AnyRpc, Rpc, RpcConfigOf, RpcConnectionOf, RpcHandler, RpcPayloadOf, RpcResultOf} from "./Rpc";


export type Parameter<D, V, R extends AnyRpc> = Rpc<//
    RpcHandler<[D, RpcPayloadOf<R>], RpcResultOf<R>>
    , {

    (data: D): RpcConnectionOf<R>

}, {
    load(data: D): Promise<V>,
    target: (value: V) => RpcConfigOf<R>
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

