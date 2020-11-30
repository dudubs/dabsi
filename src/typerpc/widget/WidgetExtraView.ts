import { ReactElement } from "react";
import { RpcConnection } from "../Rpc";
import { WidgetElement, WidgetType } from "./Widget";
import { AnyWidgetExtra } from "./WidgetExtra";
import { WidgetViewProps } from "./WidgetView";

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
