import {createElement, Fragment} from "react";
import {mapObjectToArray} from "../../common/object/mapObjectToArray";
import {Renderer} from "../../react/renderer";
import {AnyInputMap, InputMap} from "../input/InputMap";
import {RpcConnection} from "../Rpc";
import {AnyWidget, WidgetType} from "./Widget";
import {AnyWidgetMap, WidgetMap} from "./WidgetMap";
import {WidgetView, WidgetViewProps} from "./WidgetView";

export type WidgetMapViewProps<C extends RpcConnection<WidgetMap<AnyWidgetMap>>,
    T extends Record<string, RpcConnection<AnyWidget>> = C['controller']> =
    WidgetViewProps<C> & {
    fields: { [K in keyof T]: Renderer<WidgetViewProps<T[K]>> }
};

// TODO: WidgetElement
export class WidgetMapView<C extends RpcConnection<WidgetMap<AnyWidgetMap>>>
    extends WidgetView<C, WidgetMapViewProps<C>> {

    fields: Record<string, WidgetView<any>>;

    renderView(): React.ReactNode {
        return mapObjectToArray(this.element || {}, (element, key) => {
            return createElement(Fragment, {
                key,
                children: this.props.fields[key]({
                    key,
                    connection: this.props.connection[key],
                    element
                })
            })
        })
    }

}
