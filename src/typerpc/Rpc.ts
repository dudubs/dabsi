import {MetaType, MetaTypeHook, WithMetaType} from "../common/MetaType";

export type RpcHandlerFn<Payload = any, Result = any> = {
    (payload: Payload): Promise<Result>;
}


export type TRpc = {
    Handler: RpcHandlerFn,
    Connection: any,
    Config: any
};

export type Rpc<T extends TRpc> =
    WithMetaType<{ TRpc: T }> &
    {


        createRpcConnection(handler: T['Handler']): T['Connection'];

        createRpcHandler(config: T['Config']): T['Handler'];

    };


export type RpcType<T extends AnyRpc> =
    MetaType<T>['TRpc'];

export type RpcHook<R extends AnyRpc, T extends Partial<TRpc>, MT = {}> =
    MetaTypeHook<R, AnyRpc, MT> &
    Rpc<Extract<Omit<RpcType<R>, keyof T> & T, TRpc>>

export type AnyRpc = Rpc<{
    Handler: RpcHandlerFn,
    Connection: any,
    Config: any,
}>;

export type RpcPayload<T extends AnyRpc> = any;
// RpcHandler<T> extends RpcHandlerFn<infer U, any> ? U : never;

export type RpcResult<T extends AnyRpc> = any;
// RpcHandler<T> extends RpcHandlerFn<any, infer U> ? U : never;

export type RpcHandler<T extends AnyRpc> =
    RpcType<T>['Handler']

export type RpcConnection<T extends AnyRpc> =
    RpcType<T>['Connection']

export type RpcConfig<T extends AnyRpc> =
    RpcType<T>['Config']


export function connectToRpc<T extends AnyRpc>(
    rpc: T,
    config: RpcConfig<T>
): RpcConnection<T> {
    return rpc.createRpcConnection(rpc.createRpcHandler(
        config
    ))
}

export class RpcError extends Error {

}

