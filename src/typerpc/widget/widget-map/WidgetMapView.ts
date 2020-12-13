import { Renderer } from "./../../../react/renderer";
import * as React from "react";
import { ReactElement, ReactNode } from "react";
import { keys } from "../../../common/object/keys";
import { Expect } from "../../../common/typings2/Expect";
import { RpcConnection } from "../../Rpc";
import { AbstractWidgetView } from "../AbstractWidgetView";
import { AnyWidgetConnection } from "../Widget";
import { WidgetViewProps } from "../WidgetView";
import { AnyWidgetMap } from "./WidgetMap";

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
  extends AbstractWidgetView<C, WidgetMapViewProps<C>>
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
