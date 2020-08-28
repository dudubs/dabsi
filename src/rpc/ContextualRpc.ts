import {touchMap} from "../common/map/touchMap";
import {Rpc, RpcHandler, RpcType} from "./Rpc";

export type TContextualRpc = {
    Handler: RpcHandler,

    Connection: any,

    Config: object | null

    Context: any

    Static: object
};

export type ContextualRpcFactory<T extends AnyContextualRpc> =
    (config: RpcType<T>['Config']) => ContextualRpcType<T>['Context'];

export type ContextualRpcProps<T extends TContextualRpc> = {
    static: T['Static']
    createHandler(context: T['Context']): T['Handler']
    createContext: ContextualRpcFactory<ContextualRpc<T>>;
    createConnection(handler: T['Handler']): T['Connection'];
}
export type ContextualRpcType<T extends AnyContextualRpc> =
    T extends ContextualRpc<infer U> ? U : never;


export type ContextualRpc<T extends TContextualRpc> = T['Static'] & Rpc<{
    Config: T['Config'],
    Handler: T['Handler'],
    Connection: T['Connection']
}> & {
    TContextualRpc?: T;
    getContext(config: T['Config']): T['Context']
} ;

export type AnyContextualRpc = ContextualRpc<TContextualRpc>;

export function ContextualRpc<T extends TContextualRpc>(props: ContextualRpcProps<T>):
    ContextualRpc<T> {
    let nullHandler;
    const handlers = new WeakMap<any, any>();

    return ({
        ...props.static,
        getContext,
        createRpcHandler: config =>
            props.createHandler(getContext(config)),
        createRpcConnection: props.createConnection
    });

    function getContext(config: T['Config']) {
        if (!config)
            return nullHandler ?? (nullHandler = props.createContext(<any>null));
        return touchMap(handlers, config, props.createContext)
    }
}
