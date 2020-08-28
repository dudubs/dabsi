export type RpcHandler<Payload = any, Result = any> = {
    (payload: Payload): Promise<Result>;
}


export type TRpc = {
    Handler: RpcHandler,
    Connection: any,
    Config: any
};

export type Rpc<T extends TRpc> = {

    TRpc?: T;

    createRpcConnection(handler: T['Handler']): T['Connection'];

    createRpcHandler(config: T['Config']): T['Handler'];

};


export type RpcType<T extends AnyRpc> =
    T extends Rpc<infer U> ? U : never;

export type AnyRpc = Rpc<{
    Handler: RpcHandler,
    Connection: any,
    Config: any,
}>;

export type RpcPayloadType<T extends AnyRpc> =
    RpcHandlerType<T> extends RpcHandler<infer U, any> ? U : never;

export type RpcResultType<T extends AnyRpc> =
    RpcHandlerType<T> extends RpcHandler<any, infer U> ? U : never;

export type RpcHandlerType<T extends AnyRpc> =
    RpcType<T>['Handler']

export type RpcConnectionType<T extends AnyRpc> =
    RpcType<T>['Connection']

export type RpcConfigType<T extends AnyRpc> =
    RpcType<T>['Config']


export function connectToRpc<T extends AnyRpc>(
    rpc: T,
    config: RpcConfigType<T>
): RpcConnectionType<T> {
    return rpc.createRpcConnection(rpc.createRpcHandler(
        config
    ))
}

export class RpcError extends Error {

}

