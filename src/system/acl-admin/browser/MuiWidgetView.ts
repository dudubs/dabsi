import { ComponentType, createElement, Fragment, ReactElement } from "react";
import { EmptyFragment } from "../../../react/utils/EmptyFragment";
import { RpcConnection } from "../../../typerpc/Rpc";
import { AnyWidget, AnyWidgetConnection } from "../../../typerpc/widget/Widget";
import { WidgetViewProps } from "../../../typerpc/widget/WidgetView";

export function MuiWidgetView<C extends AnyWidgetConnection>(
  props: WidgetViewProps<C>
) {
  const component =
    props.connection.$widget[symbol] ||
    props.connection.$widget.rpcType?.[symbol];

  if (!component) return createElement(Fragment, null, "No widget component");
  return createElement(component, props);
}

const symbol = Symbol("view-component");
export namespace MuiWidgetView {
  export function register<T extends (...args) => AnyWidget>(
    widgetType,
    component: (props) => ReactElement
  ) {
    widgetType[symbol] = component;
  }
}
