import {Awaitable} from "../common/typings";
import {ContextualRpc, ContextualRpcFactory, TContextualRpc} from "./ContextualRpc";
import {MappedRpcHandler, MappedRpcHandlerMap, TMappedRpcHandlerMap} from "./MappedRpcHandler";
import {AnyRpc, RpcConfigType, RpcConnectionType, RpcHandlerType, RpcPayloadType, RpcResultType} from "./Rpc";


export type TBaseWidet = {
    Connection: {}
    Context: {}
    Static: {}
    Handler: {}
}
export type TWidget = {
    Connection: object,
    Config: object | null
    Context: object
    Static: object
    Handler: TMappedRpcHandlerMap
    Element: any
    Controller: AnyRpc
};

export const BaseWidgetProps = {
    createConnection: () => ({}),
    handlers: {}
};
type WidgetHandlerMap<T extends TWidget> = {
    getElement():
        T['Element']
    controller(payload: RpcPayloadType<T['Controller']>):
        RpcResultType<T['Controller']>
};

export type TWidgetRpc<T extends TWidget> = {

    Config: T['Config']

    Context: T['Context'] & {

        getControllerConfig(): RpcConfigType<T['Controller']>;

        getElement(): Awaitable<T['Element']>
    }

    Static: T['Static'] & {
        TWidget?: T

        controller: T['Controller'];
    }

    Handler: MappedRpcHandler<T['Handler'] & WidgetHandlerMap<T>>,

    Connection: T['Connection'] & {
        static: T['Static']
        controller: RpcConnectionType<T['Controller']>
        getElement(): Promise<T['Element']>
    }

};


export type WidgetProps<T extends TWidget> = {

    handlers: MappedRpcHandlerMap<T['Context'] & { config: T['Config'] }, T['Handler']>

    controller: T['Controller']

    static: T['Static'];

    createConnection(handler: TWidgetRpc<T>['Handler']): T['Connection'];

    createContext: ContextualRpcFactory<Widget<T>>

};

export type Widget<T extends TWidget> =
    ContextualRpc<TWidgetRpc<T>>;


export function Widget<T extends TWidget>(props: WidgetProps<T>): Widget<T> {
    return ContextualRpc<TWidgetRpc<T>>({
        ...props,
        static: {
            ...props.static,
            controller: props.controller,
        },
        createHandler: MappedRpcHandler<TWidgetRpc<T>['Context'] & { config: T['Config'] }, T['Handler'] & WidgetHandlerMap<T>>({
            ...props.handlers,
            controller: (context, payload) => props.controller
                .createRpcHandler(context.getControllerConfig())(
                    payload
                ),
            getElement: (context) => {
                return context.getElement()
            }
        }),
        createConnection: (handler: MappedRpcHandler<WidgetHandlerMap<T>>) => ({
            ...props.createConnection(handler),
            static: props.static,
            getElement: () => handler("getElement"),
            controller: props.controller.createRpcConnection(payload =>
                handler(["controller", payload]))
        }),
        createContext: config => {
            let controllerConfig;
            let element;
            const {getControllerConfig, getElement, ...context} = props.createContext(config);
            return {
                ...context,
                config,
                getControllerConfig: () => {
                    return controllerConfig || (controllerConfig = getControllerConfig())
                },
                getElement: () => {
                    return element ?? (element = getElement())
                }
            }
        }
    });
}

/////////////

export type AnyWidget = Widget<TWidget>;

export type WidgetType<T extends AnyWidget> =
    T extends Widget<infer U> ? U : never;



