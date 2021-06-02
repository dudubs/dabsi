import { ReactElement } from "react";
import { Renderer } from "@dabsi/view/react/renderer";
import { RpcConnection } from "@dabsi/old-typerpc/Rpc";
import { AnyWidget } from "@dabsi/old-typerpc/widget/Widget";
import { WidgetViewProps } from "@dabsi/old-typerpc/widget/view/component";

export type WidgetViewComponent<T extends AnyWidget, P = {}> = {
  (props: WidgetViewProps<RpcConnection<T>> & P): ReactElement;
  $widget: T;
};

export function WidgetViewComponent<T extends AnyWidget, P = {}>(
  widget: T,
  render: Renderer<WidgetViewProps<RpcConnection<T>> & P>
): WidgetViewComponent<T, P> {
  // TODO rename View to rpcType.name + 'View'
  View.$widget = widget;
  return View;

  function View(props) {
    return render(props);
  }
}
