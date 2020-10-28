import * as React from "react";
import { createElement, Fragment, ReactElement, ReactNode } from "react";
import { mapObject } from "../../../common/object/mapObject";
import { mapObjectToArray } from "../../../common/object/mapObjectToArray";
import { Renderer } from "../../../react/renderer";
import { RpcConnection } from "../../Rpc";
import { WidgetController } from "../../widget/Widget";
import { AbstractInputView } from "../AbstractInputView";
import { AnyInputConnection } from "../Input";
import { InputViewProps } from "../InputView";
import { InputViewChildren } from "../InputViewChildren";
import { AnyInputMap, AnyInputRecord, InputMap } from "./InputMap";

export type AnyInputMapConnection = RpcConnection<InputMap<AnyInputRecord>>;

export class InputMapView<
  C extends RpcConnection<InputMap<AnyInputRecord>>
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

  getProps<K extends keyof RpcConnection<WidgetController<C>>>(
    key: string & K
  ): InputViewProps<RpcConnection<WidgetController<C>>[K]> {
    return {
      key,
      connection: this.controller[key],
      element: this.element.elementMap[key],
      value: this.value?.[key],
      onError: view => this.props.onError?.(this),
      onChange: view =>
        this.setValue({
          ...this.value,
          [key]: view.value,
        }),
      inputRef: this.children.ref(key),
    } as InputViewProps<RpcConnection<WidgetController<C>>[K]>;
  }

  renderView(): React.ReactNode {
    return this.props.children(this.getProps.bind(this), this);
  }
}

export namespace InputMapView {
  export type FieldsProps<
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

  export function Fields<C extends AnyInputMapConnection>({
    children,
    fields: keyToRenderer,
    ...props
  }: FieldsProps<C>) {
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
          return mapObjectToArray(
            keyToRenderer,
            (render: Renderer<any>, key) => {
              return createElement(
                Fragment,
                { key },
                render(getProps(key) as any)
              );
            }
          );
        }}
      />
    );
  }
}
