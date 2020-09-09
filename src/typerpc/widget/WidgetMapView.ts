import {createElement, Fragment} from "react";
import {mapObjectToArray} from "../../common/object/mapObjectToArray";
import {Renderer} from "../../react/renderer";
import {AnyInputMap, InputMap} from "../input/InputMap";
import {InputViewProps} from "../input/InputView";
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

    renderView(): React.ReactNode {

        return mapObjectToArray(this.props.fields, (
            renderer: Renderer<WidgetViewProps<any>>, key
        ) => {
            return createElement(Fragment, {
                key,
                children: renderer({
                    key,
                    connection: this.props.connection.controller[key],
                    element: this.element?.[key]
                })
            })
        });

    }

}
