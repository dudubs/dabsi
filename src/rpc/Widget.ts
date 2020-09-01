import {Pluck} from "../common/typings";
import {
    AbstractContextualRpcContext,
    ContextualRpc,
    ContextualRpcFn,
    ContextualRpcProps,
    ContextualRpcType
} from "./ContextualRpc";
import {MappedRpcHandler, MappedRpcHandlerMap, TMappedRpcHandlerMap} from "./MappedRpcHandler";
import {AnyRpc, RpcConfig, RpcConnection, RpcPayload, RpcResult} from "./Rpc";


export type TWidget = {
    Connection: object,
    Config: any
    Context: object
    Props: object
    Handler: TMappedRpcHandlerMap
    Element: any
    Controller: AnyRpc
};

type WidgetHandlerMap<T extends TWidget> = T['Handler'] & {

    getElement():
        T['Element']
    controller(payload: RpcPayload<T['Controller']>):
        RpcResult<T['Controller']>
};

type BaseWidgetContext<T extends TWidget> = {

    getControllerConfig(): RpcConfig<T['Controller']>;

    getElement(): Promise<T['Element']>


};

export type TWidgetRpc<T extends TWidget> = {


    Config: T['Config']

    Context: WidgetContext<T>

    Props: T['Props'] & {
        TWidget?: T // nessary?
        controller: T['Controller'];
    }

    Handler: MappedRpcHandler<WidgetHandlerMap<T>>,

    Connection: BaseWidgetConnection<T> & T['Connection']

};

export type BaseWidgetConnection<T extends TWidget> = {
    handler: TWidgetRpc<T>['Handler'],
    props: T['Props']
    controller: RpcConnection<T['Controller']>
    getElement(): Promise<T['Element']>
};


export type _WidgetOptions<Widget extends AnyWidget, T extends TWidget> = {

    handler: MappedRpcHandlerMap<TWidgetRpc<T>['Context'] & {
        config: Pluck<T['Context'], 'config', T['Config']>
    }, T['Handler']>

    controller: T['Controller']

    props: T['Props'];

    createConnection(props: BaseWidgetConnection<T>): T['Connection'];

    getContextClass: () => WidgetContextClass<Widget>

};
export type WidgetOptions<Widget extends AnyWidget> =
    _WidgetOptions<Widget, WidgetType<Widget>>;

export type WidgetContext<T extends TWidget> = BaseWidgetContext<T> & T['Context'];

export type WidgetContextClass<T extends AnyWidget> =
    new(props: ContextualRpcProps<T>,
        config: RpcConfig<T>) => WidgetContext<WidgetType<T>>;

export abstract class AbstractWidgetContext<T extends AnyWidget>
    extends AbstractContextualRpcContext<T>
    implements BaseWidgetContext<WidgetType<T>> {


    abstract getControllerConfig(): RpcConfig<WidgetController<T>> ;

    abstract getElement(): Promise<WidgetElement<T>>;


}

export type Widget<T extends TWidget> =
    { TWidget?: T } &
    ContextualRpc<TWidgetRpc<T>>;


export function Widget<T extends AnyWidget>(options: WidgetOptions<T>): T {
    return ContextualRpc<T>({
        props: {
            ...options.props,
            controller: options.controller,
        },
        createHandler: MappedRpcHandler<ContextualRpcType<T>['Context'] & {
            config: RpcConfig<T>
        }, WidgetType<T>['Handler'] & WidgetHandlerMap<WidgetType<T>>>({
            ...options.handler,
            controller: (context, payload) => options.controller
                .createRpcHandler(context.getControllerConfig())(
                    payload
                ),
            getElement: (context) => {
                return context.getElement()
            }
        }),
        createConnection: (handler) => {
            const connection = {
                handler,
                props: options.props,
                getElement: () => handler("getElement"),
                controller: options.controller.createRpcConnection(payload =>
                    handler(["controller", payload]))
            };
            return Object.setPrototypeOf(options.createConnection(connection), connection);
        },
        createContext: (props, config) => {
            const contextClass = options.getContextClass();
            return new contextClass(config, props)
        }
    });
}


/////////////

export type AnyWidget = Widget<TWidget>;

export type WidgetType<T extends AnyWidget> =
    NonNullable<T['TWidget']>;


export type WidgetElement<T extends AnyWidget> =
    WidgetType<T>[ 'Element'];


export type WidgetController<T extends AnyWidget> =
    WidgetType<T>[ 'Controller'];

