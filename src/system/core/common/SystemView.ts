import { worker } from "cluster";
import { ComponentType, createElement, Fragment, ReactElement } from "react";
import { EmptyFragment } from "../../../react/utils/EmptyFragment";
import { AnyInput, AnyInputConnection } from "../../../typerpc/input/Input";
import { InputViewProps } from "../../../typerpc/input/InputView";
import { RpcConnection, RpcType } from "../../../typerpc/Rpc";
import { BaseWidgetConnection } from "../../../typerpc/widget/BaseWidgetConnection";
import { AnyWidget, AnyWidgetConnection } from "../../../typerpc/widget/Widget";
import { WidgetViewProps } from "../../../typerpc/widget/WidgetView";

export type WidgetFactory<T extends AnyWidget> = (...args: any[]) => T;

const viewComponentSymbol = Symbol();

declare global {
  interface Object {
    [viewComponentSymbol]: ComponentType<WidgetViewProps<AnyWidgetConnection>>;
  }
}

export function SystemView(
  props:
    | WidgetViewProps<AnyWidgetConnection>
    | InputViewProps<AnyInputConnection>
): ReactElement {
  const component =
    props.connection[viewComponentSymbol] ||
    props.connection.$widget[viewComponentSymbol] ||
    props.connection.$widget.rpcType?.[viewComponentSymbol];
  if (!component) {
    console.log(props.connection.$path);
    return createElement(
      Fragment,
      null,
      `No system-view ${props.connection.$path.join("/")}`
    );
  }
  return createElement(component, props);
}

export namespace SystemView {
  type F<T> = T | ((...args: any[]) => T) | RpcConnection<T>;

  type Renderer<P> = (
    props: P,
    prev: undefined | ((props?: P) => ReactElement)
  ) => ReactElement;

  export function register<T extends AnyInput>(
    input: F<T>,
    component: Renderer<InputViewProps<RpcConnection<T>>>
  ): typeof SystemView;

  export function register<T extends AnyWidget>(
    widget: F<T>,
    component: Renderer<WidgetViewProps<RpcConnection<T>>>
  ): typeof SystemView;

  export function register<T extends AnyWidget>(
    arg,
    component
  ): typeof SystemView {
    const prev = arg.rpcType?.[viewComponentSymbol];
    arg[viewComponentSymbol] = props =>
      component(props, nextProps => prev(nextProps || props));

    return SystemView;
  }
}
