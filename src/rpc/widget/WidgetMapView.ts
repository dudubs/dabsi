import {createElement, Fragment} from "react";
import {mapObjectToArray} from "../../common/object/mapObjectToArray";
import {Renderer} from "../../react/renderer";
import {AnyWidgetMap, WidgetMap} from "./WidgetMap";
import {WidgetView, WidgetViewProps} from "./WidgetView";

export type WidgetMapViewProps<T extends AnyWidgetMap> =
    WidgetViewProps<WidgetMap<T>> & {
    fields: { [K in keyof T]: Renderer<WidgetViewProps<T[K]>> }
};

// TODO: WidgetElement
export class WidgetMapView<T extends AnyWidgetMap>
    extends WidgetView<WidgetMap<T>, WidgetMapViewProps<T>> {

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
