import { ReactElement } from "react";
import { RpcConnection } from "../Rpc";
import { WidgetElement, WidgetType } from "./Widget";
import { AnyWidgetHook } from "./WidgetHook";
import { WidgetViewProps } from "./WidgetView";

export function WidgetHookView<T extends RpcConnection<AnyWidgetHook>>({
  children,
  ...props
}: WidgetViewProps<T> & {
  children: (
    props: WidgetViewProps<RpcConnection<WidgetType<T>["WidgetHookTarget"]>>,
    element: WidgetElement<T>[0]
  ) => ReactElement;
}): ReactElement {
  return children(
    {
      ...props,
      element: props[1],
    },
    props[0]
  );
}
