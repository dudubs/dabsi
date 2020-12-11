import * as React from "react";
import { ReactNode } from "react";
import { RpcConnection } from "../../Rpc";
import { AbstractWidgetView } from "../AbstractWidgetView";
import { AnyWidgetConnection } from "../Widget";
import { WidgetViewProps } from "../WidgetView";
import { AnyWidgetMap } from "./WidgetMap";

export type WidgetMapViewProps<
  C extends RpcConnection<AnyWidgetMap>
> = WidgetViewProps<C> & {
  children: (
    getProps: <K extends keyof C["map"]>(
      key: string & K
    ) => WidgetViewProps<C["map"][K]>
  ) => ReactNode;
};

//
export type AnyWidgetMapConnection = RpcConnection<AnyWidgetMap>;

export class WidgetMapView<
  C extends AnyWidgetMapConnection
> extends AbstractWidgetView<C, WidgetMapViewProps<C>> {
  renderView(): React.ReactNode {
    return this.props.children(
      (key: any) =>
        (({
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
        } as WidgetViewProps<AnyWidgetConnection>) as any)
    );
  }
}
