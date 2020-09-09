import {ReactElement} from "react";
import {Renderer} from "../../react/renderer";
import {EmptyFragment} from "../../react/utils/EmptyFragment";
import {RpcConnection} from "../Rpc";
import {ElementWidget} from "./ElementWidget";
import {AnyWidget, WidgetType} from "./Widget";
import {WidgetViewProps} from "./WidgetView";

export function ElementWidgetView2<C extends RpcConnection<ElementWidget<any, AnyWidget>>>(
    {target, element, ...props}: WidgetViewProps<C> & {
        target: Renderer<[
            WidgetType<C>['SubElement'],
            WidgetViewProps<RpcConnection<WidgetType<C>['SubWidget']>>
        ]>
    }
): ReactElement {
    if (!element)
        return EmptyFragment;
    const [subElement, targetElement] = element;
    return target([subElement, {
        ...props,
        element: targetElement
    }])
}


