import * as React from "react";
import { createElement, Fragment, ReactElement } from "react";
import { mapObject } from "../../../common/object/mapObject";
import { mapObjectToArray } from "../../../common/object/mapObjectToArray";
import { Renderer } from "../../../react/renderer";
import { InputViewProps } from "../../input/InputView";
import { RpcConnection } from "../../Rpc";
import { AbstractWidgetView } from "../AbstractWidgetView";
import { AnyWidgetConnection, WidgetController } from "../Widget";
import { WidgetViewProps } from "../WidgetView";
import { AnyWidgetMap } from "./WidgetMap";

export type WidgetMapViewProps<
  C extends RpcConnection<AnyWidgetMap>,
  T extends Record<string, AnyWidgetConnection> = RpcConnection<
    WidgetController<C>
  >
> = WidgetViewProps<C> & {
  fields: { [K in string & keyof T]: Renderer<WidgetViewProps<T[K]>> };
  children?: Renderer<{ fields: Record<string & keyof T, ReactElement> }>;
};

//
export type AnyWidgetMapConnection = RpcConnection<AnyWidgetMap>;

export class WidgetMapView<
  C extends AnyWidgetMapConnection
> extends AbstractWidgetView<C, WidgetMapViewProps<C>> {
  renderField<K extends keyof RpcConnection<WidgetController<C>>>(
    key: string & K,
    renderer: Renderer<WidgetViewProps<RpcConnection<WidgetController<C>>[K]>>
  ) {
    return createElement(
      Fragment,
      { key },
      renderer({
        key,
        connection: this.controller[key],
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

  renderView(): React.ReactNode {
    if (typeof this.props.children === "function") {
      return this.props.children({
        fields: mapObject(
          this.props.fields,
          (renderer: Renderer<WidgetViewProps<any>>, key: any) => {
            return this.renderField(key, renderer);
          }
        ),
      });
    }

    return mapObjectToArray(
      this.props.fields,
      (renderer: Renderer<WidgetViewProps<any>>, key: any) => {
        return this.renderField(key, renderer);
      }
    );
  }
}
