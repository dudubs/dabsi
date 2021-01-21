import { Renderer } from "@dabsi/react/renderer";
import React from "react";
import { ReactElement, ReactNode } from "react";
import { keys } from "@dabsi/common/object/keys";
import { Expect } from "@dabsi/common/typings2/Expect";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { WidgetView } from "@dabsi/typerpc/widget/WidgetView";
import { AnyWidgetConnection } from "@dabsi/typerpc/widget/Widget";
import { WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";
import { AnyWidgetMap } from "@dabsi/typerpc/widget/widget-map/WidgetMap";

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
      elementState: this.elementState?.[key],
      onElementStateChange: newState => {
        this.setElementState({
          ...this.elementState,
          [key]: newState,
        });
      },
    };
  }

  getChildKeys(): Iterable<string & keyof C["map"]> {
    return keys(this.connection.map as any);
  }

  renderView(): React.ReactNode {
    return this.props.children(this);
  }
}
