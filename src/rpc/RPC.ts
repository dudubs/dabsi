export type RPCHandler<Payload = any, Result = any> =
    (payload: Payload) => Promise<Result>;

export type RPCHandlerPayload<T extends RPCHandler> =
    T extends RPCHandler<infer U> ? U : never;


export type RPC<Handler extends RPCHandler, Connection, Adapter> = {

    connect(handle: Handler): Connection;

    handle(adapter: Adapter): Handler;

};


export type AnyRpc = RPC<any, any, any>;

export type RpcHandlerOf<T extends AnyRpc> =
    T extends RPC<infer U, any, any> ? U : never;

export type RpcConnectionOf<T extends AnyRpc> =
    T extends RPC<any, infer U, any> ? U : never;

export type RpcAdapterOf<T extends AnyRpc> =
    T extends RPC<any, any, infer U> ? U : never;



export function connectToAdapter<T extends AnyRpc>(
    rpc: T,
    adapter: RpcAdapterOf<T>
) {
    return rpc.connect(rpc.handle(
        adapter
    ))
}
