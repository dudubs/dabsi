import * as React from "react";
import { createElement, Fragment, ReactElement } from "react";
import { entries } from "../../common/object/entries";
import { hasKeys } from "../../common/object/hasKeys";
import { mapObject } from "../../common/object/mapObject";
import { mapObjectToArray } from "../../common/object/mapObjectToArray";
import { values } from "../../common/object/values";
import { Awaitable } from "../../common/typings";
import { Renderer } from "../../react/renderer";
import { ViewState } from "../../react/view/ViewState";
import { RpcConnection } from "../Rpc";
import {
  AnyWidget,
  WidgetController,
  WidgetElement,
  WidgetType,
} from "../widget/Widget";
import { AnyInputConnection, InputError, InputValueElement } from "./Input";
import { AnyInputMap, InputMap } from "./InputMap";
import { InputErrorOrData, InputView, InputViewProps } from "./InputView";
import { InputViewChildren } from "./InputViewChildren";

export type InputMapViewProps<
  C extends RpcConnection<InputMap<AnyInputMap>>,
  T extends Record<string, AnyInputConnection> = RpcConnection<
    WidgetController<C>
  >
> = InputViewProps<C> & {
  fields: { [K in string & keyof T]: Renderer<InputViewProps<T[K]>> };
  children?: Renderer<{
    fields: Record<string & keyof T, ReactElement>;
    view: InputMapView<C>;
  }>;
};

export class InputMapView<
  C extends RpcConnection<InputMap<AnyInputMap>>
> extends InputView<C, InputMapViewProps<C>> {
  children = new InputViewChildren();

  renderField<K extends keyof RpcConnection<WidgetController<C>>>(
    key: string & K,
    renderer: Renderer<InputViewProps<RpcConnection<WidgetController<C>>[K]>>
  ) {
    return createElement(
      Fragment,
      { key },
      renderer({
        key,
        connection: this.controller[key],
        element: this.element.items[key],
        value: this.value[key],
        error: this.children.keyToError[key],
        onError: () => {
          this.props.onError?.(this);
        },
        onChange: (view) => {
          this.setValue({
            ...this.value,
            [key]: view.value,
          });
        },
        inputRef: this.children.ref(key),
      })
    );
  }

  renderView(): React.ReactNode {
    if (typeof this.props.children === "function") {
      return this.props.children({
        view: this,
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
