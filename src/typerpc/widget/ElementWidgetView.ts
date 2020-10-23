import { ReactElement } from "react";
import { Renderer } from "../../react/renderer";
import { EmptyFragment } from "../../react/utils/EmptyFragment";
import { ElementWidget } from "../old/ElementWidget";
import { RpcConnection } from "../Rpc";
import { AnyInlineWidget } from "./inline-widget/InlineWidget";
import { AnyWidget, BasedWidget, WidgetType } from "./Widget";
import { WidgetViewProps } from "./WidgetView";

export function ElementWidgetView<
  C extends RpcConnection<ElementWidget<any, AnyWidget>>
>({
  children,
  element,
  ...props
}: WidgetViewProps<C> & {
  children: Renderer<
    [
      WidgetType<C>["SubElement"],
      WidgetViewProps<RpcConnection<WidgetType<C>["SubWidget"]>>
    ]
  >;
}): ReactElement {
  if (!element) return EmptyFragment;
  const [subElement, targetElement] = element;
  return children([
    subElement,
    {
      ...props,
      element: targetElement,
    },
  ]);
}

const x: BasedWidget = (null as any) as RpcConnection<AnyInlineWidget>;
