export type RpcHandler<Payload = any, Result = any> = {
    (payload: Payload): Promise<Result>;
}

export type RpcHandlerPayload<T extends RpcHandler> =
    T extends RpcHandler<infer U> ? U : never;


export type Rpc<Handler extends RpcHandler, Connection, Config> = {

    connect(handler: Handler): Connection;

    handle(config: Config): Handler;

};


export type AnyRpc = Rpc<any, any, any>;

export type RpcPayloadOf<T extends AnyRpc> =
    RpcHandlerOf<T> extends RpcHandler<infer U, any> ? U : never;

export type RpcResultOf<T extends AnyRpc> =
    RpcHandlerOf<T> extends RpcHandler<any,infer U> ? U : never;

export type RpcHandlerOf<T extends AnyRpc> =
    T extends Rpc<infer U, any, any> ? U : never;

export type RpcConnectionOf<T extends AnyRpc> =
    T extends Rpc<any, infer U, any> ? U : never;

export type RpcConfigOf<T extends AnyRpc> =
    T extends Rpc<any, any, infer U> ? U : never;


export function connectToRpc<T extends AnyRpc>(
    rpc: T,
    config: RpcConfigOf<T>
):RpcConnectionOf<T> {
    return rpc.connect(rpc.handle(
        config
    ))
}

export class RpcError extends Error {
    constructor(public reason: any) {
        super();
    }
}
