import { ReactElement } from "react";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { WidgetElement, WidgetType } from "@dabsi/typerpc/widget/Widget";
import { AnyWidgetExtra } from "@dabsi/typerpc/widget/extra/rpc";
import { WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";

export function WidgetExtraView<T extends RpcConnection<AnyWidgetExtra>>({
  children,
  ...props
}: WidgetViewProps<T> & {
  children: (
    props: WidgetViewProps<RpcConnection<WidgetType<T>["WidgetExtraTarget"]>>,
    element: WidgetElement<T>["extra"]
  ) => ReactElement;
}): ReactElement {
  return children(props, props.element.extra);
}
