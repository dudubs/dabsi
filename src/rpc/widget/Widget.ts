import {Fn, HasKeys, If, Is, Not, PartialUndefinedKeys, NonNullableAt} from "../../common/typings";
import {ContextualRpc, ContextualRpcProps, ContextualRpcType} from "../ContextualRpc";
import {NoRpc} from "../NoRpc";
import {AnyRpc, RpcConfig, RpcConnection, RpcPayload, RpcResult} from "../Rpc";
import {IsRpcGenericConfigFn, RpcGenericConfig, RpcGenericConfigFn} from "../RpcGenericConfig";
import {RpcMapHandler, RpcMapHandlerMap, TRpcMapHandlerMap} from "../RpcMapHandler";


export type WidgetHandlerMap<T extends TWidget> = T['Handler'] & {

    getElement():
        T['Element']
    controller(payload: RpcPayload<T['Controller']>):
        RpcResult<T['Controller']>
};

export type BaseWidgetContext<T extends TWidget> = {


    getControllerConfig(): RpcConfig<T['Controller']>;

    getElement(): Promise<T['Element']>


};

type WidgetHandler<T extends TWidget> = RpcMapHandler<WidgetHandlerMap<T>>;

export type WidgetConnection<T extends TWidget> = {

    TWidget?: T;

    handler: WidgetHandler<T>,
    props: Readonly<T['Props']>
    controller: RpcConnection<T['Controller']>
    getElement(): Promise<T['Element']>
};


export type WidgetContext<T extends TWidget> = BaseWidgetContext<T>
    & T['Context'] & {
    config: WidgetContextConfig<T>
};

export type WidgetContextClass<T extends AnyWidget> =
    new(props: ContextualRpcProps<T>,
        config: WidgetContextConfig<WidgetType<T>>) =>
        WidgetContext<WidgetType<T>>;

export type WidgetContextConfig<T extends TWidget, C = T['Config']> =
    C extends Fn ? If<IsRpcGenericConfigFn<C>, ReturnType<C>, C> : C;

export type TWidget = {
    Connection: object,
    Config: any
    Context: object
    Props: object
    Handler: TRpcMapHandlerMap
    Element: any
    Controller: AnyRpc
};


export type Widget<T extends TWidget> = { TWidget?: T } & ContextualRpc<{

    Config: T['Config']

    Context: WidgetContext<T>

    Props: T['Props'] & {
        controller: T['Controller'];
    }

    Handler: WidgetHandler<T>

    Connection: WidgetConnection<T> & T['Connection'] & {
        TWidget?:T;
    }

}>;


/*



 */

export type WidgetOptions<Widget extends AnyWidget,
    T extends TWidget> = PartialUndefinedKeys<{


    connection:
        ThisType<WidgetConnection<T>> & T['Connection']
        | If<Not<HasKeys<T['Connection']>>, undefined>;

    readonly context: WidgetContextClass<Widget>

    isGenericConfig: boolean
        | If<Not<Is<T['Config'], RpcGenericConfigFn>>, undefined>;

    props: T['Props']
        | If<Not<HasKeys<T['Props']>>, undefined>;

    controller: T['Controller']
        | If<Is<T['Controller'], NoRpc>, undefined>;

    handler: RpcMapHandlerMap<WidgetHandlerContext<T>, T['Handler']>
        | If<Not<HasKeys<T['Handler']>>, undefined>;
}>;

type WidgetHandlerContext<T extends TWidget> = T['Context'] & {
    props: T['Props']
    config: WidgetContextConfig<T>
};

export function Widget<T extends AnyWidget>(
    options: WidgetOptions<T, WidgetType<T>>
) {
    const {
        props = {},
        handler = {},
        connection = {},
        controller = NoRpc,
        context,
        isGenericConfig = false,

    } =
        <WidgetOptions<AnyWidget, TWidget>>options;


    type H = WidgetHandlerMap<TWidget>;

    type C = ContextualRpcType<T>['Context'] & {
        config: RpcConfig<T>
    };

    return <T>ContextualRpc<AnyWidget>({
        props: {
            ...props,
            controller
        },
        createHandler: RpcMapHandler<C, H>({
            ...handler,
            controller: (context, payload) => {
                const controllerConfig = context.getControllerConfig();
                return controller.createRpcHandler(controllerConfig)(
                    payload
                );
            },
            getElement: (context) => {
                return context.getElement()
            }
        }),
        createConnection: (handler, props) => {
            return Object.setPrototypeOf(
                {
                    handler,
                    props,
                    getElement: () => handler("getElement"),
                    controller: controller
                        .createRpcConnection(payload =>
                            handler(["controller", payload])
                        )
                },
                connection
            );
        },
        createContext: (props, config: any) => {
            if (isGenericConfig) {
                config = RpcGenericConfig(config)
            }

            return new context(props, config)
        }
    })
}


/////////////

export type AnyWidget = Widget<TWidget>;

export type WidgetType<T extends AnyWidget | RpcConnection<AnyWidget>> =
    NonNullableAt<T, 'TWidget'>;


export type WidgetElement<T extends AnyWidget> =
    WidgetType<T>[ 'Element'];


export type WidgetController<T extends AnyWidget> =
    WidgetType<T>[ 'Controller'];

