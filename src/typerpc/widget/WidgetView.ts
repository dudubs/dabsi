import { ReactElement } from "react";
import { IfNever } from "../../common/typings2/IfNever";
import { RpcConnection } from "../Rpc";
import {
  AnyWidget,
  AnyWidgetConnection,
  TWidget,
  WidgetElement,
  WidgetElementState,
  WidgetType,
} from "./Widget";

export type WidgetViewRenderer<T extends AnyWidget, P = {}> = (
  props: WidgetViewProps<RpcConnection<T>> & P
) => ReactElement;

export interface WidgetViewProps<C extends AnyWidgetConnection> {
  key?: string | number;

  mapKey?: string;

  connection: C;

  element: WidgetElement<C>;

  elementState: WidgetElementState<C> | undefined;

  onElementStateChange: ((state: WidgetElementState<C>) => void) | undefined;
}

export type WidgetView<
  C extends AnyWidgetConnection,
  T extends TWidget = WidgetType<C>
> = {
  readonly element: T["Element"];

  setElement(element: T["Element"]): void;
};
