import {touchMap} from "../common/map/touchMap";
import {Awaitable} from "../common/typings";
import {Rpc, RpcHandlerFn, RpcType} from "./Rpc";

export type TContextualRpc = {
    Handler: RpcHandlerFn,

    Connection: any,

    Config: object | null

    Context: object

    Props: object

};

export type ContextualRpcFn<T extends AnyContextualRpc> =
    (props: ContextualRpcType<T>['Props'], config: RpcType<T>['Config']) =>
        ContextualRpcType<T>['Context'];


// TODO: REMOVE
export type ContextualRpcContextClass<T extends TContextualRpc> =
    new(props: T['Props'], config: T['Config']) => T['Context'];

export type ContextualRpcProps<T extends AnyContextualRpc> =
    ContextualRpcType<T>['Props'];

export type ContextualRpcType<T extends AnyContextualRpc> =
    NonNullable<T['TContextualRpc']>;


export type ContextualRpc<T extends TContextualRpc> =
    BaseContextualRpc<T> ;

export type BaseContextualRpc<T extends TContextualRpc> = Rpc<{


    Config: T['Config'],
    Handler: T['Handler'],
    Connection: T['Connection']
}> & {
    TContextualRpc?: T;
    getContext(config: T['Config']): T['Context']
    props: T['Props'];
} ;

export type AnyContextualRpc = ContextualRpc<TContextualRpc>;

export type ContextualRpcOptions<T extends TContextualRpc> = {
    props:  Readonly<T['Props']>

    createHandler(context: T['Context']): T['Handler']
    createContext: ContextualRpcFn<ContextualRpc<T>>;
    createConnection(handler: T['Handler'], props: Readonly<T['Props']>): T['Connection'];

}

export function ContextualRpc<T extends AnyContextualRpc>(
    options: ContextualRpcOptions<ContextualRpcType<T>>):
    T {
    let nullHandler;
    const handlers = new WeakMap<any, any>();

    const base: BaseContextualRpc<ContextualRpcType<T>> = {
        props: options.props,
        async getContext(config) {
            if (!config)
                return nullHandler ?? (nullHandler = await options.createContext(options.props, <any>null));

            return touchMap(handlers, config, config => options.createContext(options.props, config))
        },
        createRpcHandler: config =>
            options.createHandler(base.getContext(config)),
        createRpcConnection: handler =>
            options.createConnection(handler, options.props)
    };


    return <any>base

}
