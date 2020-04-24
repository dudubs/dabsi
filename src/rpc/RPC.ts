export type RPCConnection = (data: any) => Promise<{ error?, result? }>;

export type RPC<T> = {
    connect(connection: RPCConnection): T
}

export type RPCClient<T extends RPC<any>> =
    T extends RPC<infer U> ? U : never;

export type RPCModule = Record<string, RPC<any>>;
