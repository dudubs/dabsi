export type RPCHandler<Payload = any, Result = any> =
    (payload: Payload) => Promise<Result>;

export type RPCHandlerPayload<T extends RPCHandler> =
    T extends RPCHandler<infer U> ? U : never;


export type RPC<Handler extends RPCHandler, Connection, Config> = {

    connect(handle: Handler): Connection;

    handle(config: Config): Handler;

};


export type AnyRPC = RPC<any, any, any>;

export type RPCHandlerOf<T extends AnyRPC> =
    T extends RPC<infer U, any, any> ? U : never;

export type RPCConnectionOf<T extends AnyRPC> =
    T extends RPC<any, infer U, any> ? U : never;

export type RPCConfigOf<T extends AnyRPC> =
    T extends RPC<any, any, infer U> ? U : never;


