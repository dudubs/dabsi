import {Page} from "./Page";
import {AnyWidget, WidgetType} from "./Widget";
import {WidgetView, WidgetViewProps} from "./WidgetView";

export type PageViewProps<T extends AnyWidget> = WidgetViewProps<Page<T>> & {}

export class PageView<T extends AnyWidget> extends WidgetView<Page<T>, PageViewProps<T>> {

    setElement(element: WidgetType<Page<T>>["Element"] | null) {
    }

    renderView(): React.ReactNode {
        return undefined;
    }
}
