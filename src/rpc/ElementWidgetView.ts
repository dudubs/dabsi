import {Renderer} from "../react/renderer";
import {EmptyFragment} from "../react/utils/EmptyFragment";
import {ElementWidget} from "./ElementWidget";
import {AnyWidget} from "./Widget";
import {WidgetView, WidgetViewProps} from "./WidgetView";

export type ElementWidgetViewProps<E, T extends AnyWidget> =
    WidgetViewProps<ElementWidget<E, T>>;

export class ElementWidgetView<E, T extends AnyWidget>
    extends WidgetView<ElementWidget<E, T>, ElementWidgetViewProps<E, T> & {
        target: Renderer<[E, WidgetViewProps<T>]>
    }> {

    target: WidgetView<T> | null;

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

