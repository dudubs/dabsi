export type RPCHandler<Data = any, Result = any> = (data: Data) => Promise<Result>;


export type RPC<Handler extends RPCHandler, Connection, Config> = {

    connect(handle: Handler): Connection;

    handle(config: Config): Handler;

};


export type AnyRPC = RPC<any, any, any>;

export type RPCConfigOf<T extends AnyRPC> =
    Parameters<T['handle']>[0];

export type RPCHandlerOf<T extends AnyRPC> =
    T extends RPC<infer U, any, any> ? U : never;

export type RPCConnectionOf<T extends AnyRPC> =
    T extends RPC<any, infer U, any> ? U : never;
