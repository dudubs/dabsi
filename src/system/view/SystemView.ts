import { ComponentType, createElement, Fragment, ReactElement } from "react";
import { Renderer } from "../../react/renderer";
import { AnyInput, AnyInputConnection } from "../../typerpc/input/Input";
import { InputViewProps } from "../../typerpc/input/InputView";
import { RpcConnection } from "../../typerpc/Rpc";
import { AnyWidget, AnyWidgetConnection } from "../../typerpc/widget/Widget";
import { WidgetViewProps } from "../../typerpc/widget/WidgetView";

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

  export function register<T extends AnyInput>(
    input: F<T>,
    component: Renderer<
      InputViewProps<RpcConnection<T>>,
      [prev: ComponentType<InputViewProps<RpcConnection<T>>>]
    >
  ): typeof SystemView;

  export function register<T extends AnyWidget>(
    widget: F<T>,
    component: Renderer<
      WidgetViewProps<RpcConnection<T>>,
      [prev: ComponentType<WidgetViewProps<RpcConnection<T>>>]
    >
  ): typeof SystemView;

  export function register<T extends AnyWidget>(
    arg,
    renderer
  ): typeof SystemView {
    const prev =
      arg.$widget?.rpcType?.[viewComponentSymbol] ||
      arg.rpcType?.[viewComponentSymbol];

    arg[viewComponentSymbol] = props => renderer(props, prev);

    return SystemView;
  }
}
