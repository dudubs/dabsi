import { ReactElement } from "react";
import { Renderer } from "@dabsi/view/react/renderer";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { AnyWidget } from "@dabsi/typerpc/widget/Widget";
import { WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";

export type WidgetFnView<T extends AnyWidget, P = {}> = {
  (props: WidgetViewProps<RpcConnection<T>> & P): ReactElement;
  $widget: T;
};

export function WidgetFnView<T extends AnyWidget, P = {}>(
  widget: T,
  render: Renderer<WidgetViewProps<RpcConnection<T>> & P>
): WidgetFnView<T, P> {
  // TODO rename View to rpcType.name + 'View'
  View.$widget = widget;
  return View;

  function View(props) {
    return render(props);
  }
}
