import {touchMap} from "../common/map/touchMap";
import {Lazy} from "../common/patterns/lazy";
import {assignOnce} from "./assignOnce";
import {Rpc, RpcConfig, RpcHandlerFn, RpcType} from "./Rpc";
import {AnyRpcWithGenericConfig, RpcGenericConfig} from "./RpcGenericConfig";

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


export type ContextualRpcOptions<T extends TContextualRpc> = {
    props: T['Props']
    createHandler(context: T['Context']): T['Handler']
    createContext?: ContextualRpcFn<ContextualRpc<T>>;
    createConnection(handler: T['Handler']): T['Connection'];

}

export type ContextualRpcContextClass<T extends TContextualRpc> =
    new(props: T['Props'], config: T['Config']) => T['Context'];

export type ContextualRpcProps<T extends AnyContextualRpc> =
    ContextualRpcType<T>['Props'];

export abstract class AbstractContextualRpcContext<T extends AnyContextualRpc> {
    constructor(
        public props: ContextualRpcProps<T>,
        public config: RpcConfig<T>
    ) {

    }

    get genericConfig(): RpcGenericConfig<Extract<T, AnyRpcWithGenericConfig>> {
        if (typeof this.config === "function")
            return RpcGenericConfig(<any>this.config)
        throw new Error('Is not generic config.')
    }
}

export type ContextualRpcType<T extends AnyContextualRpc> =
    NonNullable<T['TContextualRpc']>;


export type ContextualRpc<T extends TContextualRpc> =
    T['Props'] & BaseContextualRpc<T> ;

export type BaseContextualRpc<T extends TContextualRpc> = Rpc<{


    Config: T['Config'],
    Handler: T['Handler'],
    Connection: T['Connection']
}> & {
    TContextualRpc?: T;
    getContext(config: T['Config']): T['Context']
} ;

export type AnyContextualRpc = ContextualRpc<TContextualRpc>;

export function ContextualRpc<T extends AnyContextualRpc>(
    options: ContextualRpcOptions<ContextualRpcType<T>>):
    T {
    let nullHandler;
    const handlers = new WeakMap<any, any>();

    let base: BaseContextualRpc<ContextualRpcType<T>> = {
        getContext,
        createRpcHandler: config =>
            options.createHandler(getContext(config)),
        createRpcConnection: options.createConnection
    };

    assignOnce(base, options.props);

    return <any>base

    function getContext(config: ContextualRpcType<T>['Config']) {
        if (!config)
            return nullHandler ?? (nullHandler = options.createContext!(<any>null, options.props));
        return touchMap(handlers, config, config => options.createContext!(config, options.props))
    }
}
