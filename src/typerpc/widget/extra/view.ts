import { ReactElement } from "react";
import { RpcConnection } from "@dabsi/old-typerpc/Rpc";
import { WidgetElement, WidgetType } from "@dabsi/old-typerpc/widget/Widget";
import { AnyWidgetExtra } from "@dabsi/old-typerpc/widget/extra/rpc";
import { WidgetViewProps } from "@dabsi/old-typerpc/widget/view/component";

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
