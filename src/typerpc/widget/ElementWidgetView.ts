import {ReactElement} from "react";
import {Renderer} from "../../react/renderer";
import {EmptyFragment} from "../../react/utils/EmptyFragment";
import {RpcConnection} from "../Rpc";
import {ElementWidget} from "./ElementWidget";
import {AnyWidget, WidgetType} from "./Widget";
import {WidgetViewProps} from "./WidgetView";

export function ElementWidgetView<C extends RpcConnection<ElementWidget<any, AnyWidget>>>(
    {children, element, ...props}: WidgetViewProps<C> & {
        children: Renderer<[
            WidgetType<C>['SubElement'],
            WidgetViewProps<RpcConnection<WidgetType<C>['SubWidget']>>
        ]>
    }
): ReactElement {
    if (!element)
        return EmptyFragment;
    const [subElement, targetElement] = element;
    return children([subElement, {
        ...props,
        element: targetElement
    }])
}



