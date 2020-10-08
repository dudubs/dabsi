import { ReactElement, useEffect, useState } from "react";
import { RpcConnection } from "../Rpc";
import {
  AnyWidget,
  AnyWidgetConnection,
  TWidget,
  WidgetElement,
  WidgetType,
} from "./Widget";

export type WidgetViewFn<T extends AnyWidget, P = {}> = (
  props: WidgetViewProps<RpcConnection<T>> & P
) => ReactElement;
export type WidgetViewProps<C extends AnyWidgetConnection> = {
  key?: string | number;

  connection: C;

  element: WidgetElement<C>;
};

export type WidgetView<
  C extends AnyWidgetConnection,
  T extends TWidget = WidgetType<C>
> = {
  readonly element: T["Element"];

  setElement(element: T["Element"]): void;
};

export function useWidgetView<C extends AnyWidgetConnection>(
  props: WidgetViewProps<C>
) {
  const [element, setElement] = useState(props.element);

  useEffect(() => {
    if (element !== props.element) {
      setElement(props.element);
    }
  }, [props.element]);

  return { element, setElement };
}
