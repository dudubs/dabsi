import { ReactElement } from "react";
import { Renderer } from "../../react/renderer";
import { RpcConnection } from "../Rpc";
import { AnyWidget } from "./Widget";
import { WidgetViewProps } from "./WidgetView";

export type WidgetViewFn<T extends AnyWidget, P = {}> = {
  (props: WidgetViewProps<RpcConnection<T>> & P): ReactElement;
  $widget: T;
};

export function WidgetViewFn<T extends AnyWidget, P = {}>(
  widget: T,
  render: Renderer<WidgetViewProps<RpcConnection<T>> & P>
): WidgetViewFn<T, P> {
  // TODO rename View to rpcType.name + 'View'
  View.$widget = widget;
  return View;

  function View(props) {
    return render(props);
  }
}
