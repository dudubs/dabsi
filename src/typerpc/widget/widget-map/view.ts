import { keys } from "@dabsi/common/object/keys";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { AnyWidgetConnection } from "@dabsi/typerpc/widget/Widget";
import { AnyWidgetMap } from "@dabsi/typerpc/widget/widget-map/rpc";
import { WidgetView, WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";
import { Renderer } from "@dabsi/view/react/renderer";
import React from "react";

export type MapView<P extends WidgetViewProps<AnyWidgetConnection>> = {
  getChildProps(key: string): P;
  getChildKeys(): Iterable<string>;
};

export type WidgetMapViewProps<
  C extends RpcConnection<AnyWidgetMap>
> = WidgetViewProps<C> & {
  children: Renderer<WidgetMapView<C>>;
};

//
export type AnyWidgetMapConnection = RpcConnection<AnyWidgetMap>;

export class WidgetMapView<C extends AnyWidgetMapConnection>
  extends WidgetView<C, WidgetMapViewProps<C>>
  implements MapView<WidgetViewProps<AnyWidgetConnection>> {
  getChildProps<K extends keyof C["map"]>(
    key: string & K
  ): WidgetViewProps<C["map"][K]> {
    return {
      key,
      connection: this.connection.map[key],
      element: this.element.elementMap[key],
      elementState: this.elementState?.stateMap?.[key],
      onElementStateChange: newState => {
        this.setElementState({
          ...this.elementState,
          stateMap: { ...this.elementState?.stateMap, [key]: newState },
        });
      },
    };
  }

  getChildKeys(): Iterable<string & keyof C["map"]> {
    return keys(this.element.elementMap);
  }

  renderView(): React.ReactNode {
    return this.props.children(this);
  }
}
