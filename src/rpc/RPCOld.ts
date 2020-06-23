export type RPCConnectionOld = (data: any) => Promise<{ error?, result? }>;

export type RPCOld<T> = {
    connect(connection: RPCConnectionOld): T
}

export type RPCClientOld<T extends RPCOld<any>> =
    T extends RPCOld<infer U> ? U : never;
