import * as React from "react";
import { createElement, Fragment, ReactElement, ReactNode } from "react";
import { mapObject } from "../../../common/object/mapObject";
import { mapObjectToArray } from "../../../common/object/mapObjectToArray";
import { Renderer } from "../../../react/renderer";
import { RpcConnection } from "../../Rpc";
import { AbstractWidgetView } from "../AbstractWidgetView";
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
      (key: any): WidgetViewProps<any> => ({
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
      })
    );
  }
}
