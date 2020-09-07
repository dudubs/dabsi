import {NonNullableAt} from "../../common/typings";
import {Renderer} from "../../react/renderer";
import {EmptyFragment} from "../../react/utils/EmptyFragment";
import {RpcConnection} from "../Rpc";
import {ElementWidget} from "./ElementWidget";
import {AnyWidget, WidgetType} from "./Widget";
import {WidgetView, WidgetViewProps} from "./WidgetView";

export type ElementWidgetViewProps<C extends RpcConnection<ElementWidget<any, AnyWidget>>> =
    WidgetViewProps<C>;

export class ElementWidgetView<C extends RpcConnection<ElementWidget<any, AnyWidget>>,
    E, T extends AnyWidget>
    extends WidgetView<C, ElementWidgetViewProps<C> & {
        target: Renderer<[NonNullableAt<WidgetType<C>, 'TElement'>,
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

