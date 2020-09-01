import {Awaitable} from "../common/typings";
import {RpcConfig, RpcConnection} from "./Rpc";
import {AbstractWidgetContext, AnyWidget, Widget, WidgetController, WidgetElement, WidgetType} from "./Widget";

export class ElementWidgetContext<E, T extends AnyWidget,
    C extends ElementWidget<E, T>> extends AbstractWidgetContext<C> {
    getControllerConfig(): RpcConfig<WidgetController<C>> {
        return this.config.target;
    }

    async getElement(): Promise<WidgetElement<C>> {
        return [await this.config.getElement(),
            await this.props.target.getContext(this.config.target).getElement()
        ]
    }

}

export type ElementWidget<E, T extends AnyWidget> = Widget<{
    Props: { target: T },
    Config: {
        getElement: () => Awaitable<E>,
        target: RpcConfig<T>
    }
    Element: [E, WidgetElement<T>]
    Controller: T,
    Connection: {}
    Handler: {}
    Context: {}
}>;

/*

    const Page = RpcConfigu(
        WidgetElement<{title: string}>>()(),

    )
 */
export function ElementWidget<E>() {
    return <T extends AnyWidget>(target: T): ElementWidget<E, T> => {
        return Widget<ElementWidget<E, T>>({
            props: {target},
            controller: target,
            handler: {},
            getContextClass: () => ElementWidgetContext,
            createConnection: props => props.controller,

        })
    }
}


