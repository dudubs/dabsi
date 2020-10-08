import React, { createElement, Fragment, ReactNode } from "react";
import { mapObjectToArray } from "../../common/object/mapObjectToArray";
import { Renderer } from "../../react/renderer";
import { RpcConnection } from "../Rpc";
import { WidgetController } from "../widget/Widget";
import { WidgetViewProps } from "../widget/WidgetView";
import { AnyInputConnection } from "./Input";
import { AnyInputMapConnection, InputMapView } from "./InputMapView";
import { InputView, InputViewProps, useInputView } from "./InputView";

export function InputMapView2<C extends AnyInputMapConnection>(
  props: InputViewProps<C> & {
    children(
      getProps: {
        <K extends keyof RpcConnection<WidgetController<C>>>(
          key: string & K
        ): WidgetViewProps<RpcConnection<WidgetController<C>>[K]>;
      },
      input: InputView<C>
    ): ReactNode;
  }
) {
  const view = useInputView(props, {
    async inputWillValidate() {},
  });

  return createElement(
    Fragment,
    null,
    props.children(
      // @ts-ignore
      getProps,
      view
    )
  );

  function getProps(key: string): InputViewProps<AnyInputMapConnection> {
    return {
      key,
      // @ts-ignore
      connection: props.connection.controller[key],
      element: view.element[key],
      value: view.value[key],
      onError: () => props.onError?.(view),
      onChange: (child) => view.setValue({ ...view.value, [key]: child.value }),
      inputRef: view.children?.ref(key),
    };
  }
}

InputMapView2.Fields = function <
  C extends AnyInputMapConnection,
  T extends Record<string, AnyInputConnection> = RpcConnection<
    WidgetController<C>
  >
>({
  fields,
  ...props
}: InputViewProps<C> & {
  fields: { [K in string & keyof T]: Renderer<InputViewProps<T[K]>> };
  view: InputMapView<C>;
}) {
  return (
    <InputMapView2
      {...props}
      children={(getProps, view) => {
        return mapObjectToArray(fields, (renderField, key) => {
          return renderField(getProps(key) as any);
        });
      }}
    />
  );
};
