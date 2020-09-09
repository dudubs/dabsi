import {Awaitable, NonNullableAt} from "../../common/typings";
import {Renderer} from "../../react/renderer";
import {EmptyFragment} from "../../react/utils/EmptyFragment";
import {RpcConfig, RpcConnection} from "../Rpc";
import {AbstractWidgetContext} from "./AbstractWidgetContext";
import {AnyWidget, Widget, WidgetController, WidgetElement, WidgetType} from "./Widget";
import {WidgetView, WidgetViewProps} from "./WidgetView";

export type ElementWidget<E, T extends AnyWidget> = Widget<{
    SubElement: E;
    SubWidget: T;

    Props: {},
    Config: {
        getElement: () => Awaitable<E>,
        targetConfig: RpcConfig<T>
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
        return <any>Widget<ElementWidget<E, AnyWidget>>({
            controller: target,
            context: ElementWidgetContext,
        })
    }
}

export class ElementWidgetContext<E, T extends AnyWidget,
    C extends ElementWidget<E, T>> extends AbstractWidgetContext<C> {

    getControllerConfig(): RpcConfig<WidgetController<C>> {
        return this.config.targetConfig;
    }

    async getElement(): Promise<WidgetElement<C>> {
        return [await this.config.getElement(),
            await this.props.controller.getContext(this.config.targetConfig).getElement()
        ]
    }

}

export type ElementWidgetViewProps<C extends RpcConnection<ElementWidget<any, AnyWidget>>> =
    WidgetViewProps<C>;

export class ElementWidgetView<C extends RpcConnection<ElementWidget<any, AnyWidget>>,
    E, T extends AnyWidget>
    extends WidgetView<C, ElementWidgetViewProps<C> & {
        target: Renderer<[NonNullableAt<WidgetType<C>, 'SubElement'>,
            WidgetViewProps<C['controller']>]>
    }> {

    target: WidgetView<C['controller']> | null;

    renderView(): React.ReactNode {
        if (!this.element)
            return EmptyFragment
        const [target, element] = this.element;
        return this.props.target([
            target,
            {
                connection: this.props.connection.controller,
                element,
                inputRef: input => {
                    this.target = input;
                }
            }
        ]);
    }

}
