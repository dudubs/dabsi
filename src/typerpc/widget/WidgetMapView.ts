import * as React from "react";
import { createElement, Fragment, ReactElement } from "react";
import { mapObject } from "../../common/object/mapObject";
import { mapObjectToArray } from "../../common/object/mapObjectToArray";
import { values } from "../../common/object/values";
import { Renderer } from "../../react/renderer";
import { InputViewProps } from "../input/InputView";
import { RpcConnection } from "../Rpc";
import { AnyRpcMap, RpcMap } from "../RpcMap";
import {
  AnyWidget,
  AnyWidgetConnection,
  WidgetController,
  WidgetHook,
} from "./Widget";
import { AnyWidgetMap, WidgetMap } from "./WidgetMap";
import { WidgetView, WidgetViewProps } from "./WidgetView";

export type WidgetMapViewProps<
  C extends RpcConnection<WidgetMap<AnyWidgetMap>>,
  T extends Record<string, AnyWidgetConnection> = RpcConnection<
    WidgetController<C>
  >
> = WidgetViewProps<C> & {
  fields: { [K in string & keyof T]: Renderer<WidgetViewProps<T[K]>> };
  children?: Renderer<{ fields: Record<string & keyof T, ReactElement> }>;
};

//
export type AnyWidgetMapConnection = RpcConnection<WidgetMap<AnyWidgetMap>>;

export class WidgetMapView<C extends AnyWidgetMapConnection> extends WidgetView<
  C,
  WidgetMapViewProps<C>
> {
  fields: Record<string, WidgetView<AnyWidgetConnection>> = {};

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
        element: this.element[key],
      })
    );
  }

  renderView(): React.ReactNode {
    if (typeof this.props.children === "function") {
      return this.props.children({
        fields: mapObject(
          this.props.fields,
          (renderer: Renderer<InputViewProps<any>>, key: any) => {
            return this.renderField(key, renderer);
          }
        ),
      });
    }

    return mapObjectToArray(
      this.props.fields,
      (renderer: Renderer<InputViewProps<any>>, key: any) => {
        return this.renderField(key, renderer);
      }
    );
  }
}
