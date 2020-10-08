import * as React from "react";
import {
  ComponentClass,
  createElement,
  Fragment,
  ReactElement,
  ReactNode,
} from "react";
import { entries } from "../../common/object/entries";
import { hasKeys } from "../../common/object/hasKeys";
import { keys } from "../../common/object/keys";
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
import { AbstractInputView } from "./AbstractInputView";
import { AnyInputConnection, InputError, InputValueElement } from "./Input";
import { AnyInputMap, InputMap } from "./InputMap";
import { InputErrorOrData, InputView, InputViewProps } from "./InputView";
import { InputViewChildren } from "./InputViewChildren";

export type AnyInputMapConnection = RpcConnection<InputMap<AnyInputMap>>;

export class InputMapView<
  C extends RpcConnection<InputMap<AnyInputMap>>
> extends AbstractInputView<
  C,
  InputViewProps<C> & {
    children(
      getProps: <K extends keyof RpcConnection<WidgetController<C>>>(
        key: string & K
      ) => InputViewProps<RpcConnection<WidgetController<C>>[K]>,
      view: InputMapView<C>
    ): ReactNode;
  }
> {
  children = new InputViewChildren();

  // TODO: createPropsProxy(x, ()=>{})
  getProps<K extends keyof RpcConnection<WidgetController<C>>>(
    key: string & K
  ): InputViewProps<RpcConnection<WidgetController<C>>[K]> {
    return {
      key,
      connection: this.controller[key],
      element: this.element.items[key],
      value: this.value[key],
      onError: (view) => this.props.onError?.(this),
      onChange: (view) =>
        this.setValue({
          ...this.value,
          [key]: view.value,
        }),
      inputRef: this.children.ref(key),
    };
  }

  renderField<K extends keyof RpcConnection<WidgetController<C>>>(
    key: string & K,
    renderer: Renderer<InputViewProps<RpcConnection<WidgetController<C>>[K]>>
  ) {
    return createElement(Fragment, { key }, renderer(this.getProps(key)));
  }

  renderView(): React.ReactNode {
    return this.props.children(this.getProps.bind(this), this);
  }

  static Fields<C extends AnyInputMapConnection>({
    children,
    fields: keyToRenderer,
    ...props
  }: InputMapViewFieldsProps<C>) {
    return (
      <InputMapView
        {...props}
        children={(getProps, view) => {
          if (typeof children === "function") {
            return children({
              view,
              fields: mapObject(keyToRenderer, (render, key) => {
                return createElement(
                  Fragment,
                  { key },
                  render(getProps(key) as any)
                );
              }),
            });
          }
          return mapObjectToArray(keyToRenderer, (render, key) => {
            return createElement(
              Fragment,
              { key },
              render(getProps(key) as any)
            );
          });
        }}
      />
    );
  }
}

export type InputMapViewFieldsProps<
  C extends AnyInputMapConnection,
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
