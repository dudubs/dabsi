import { ComponentType, createElement, Fragment, ReactElement } from "react";
import { Renderer } from "../../react/renderer";
import { AnyInput, AnyInputConnection } from "../../typerpc/input/Input";
import { InputViewProps } from "../../typerpc/input/InputView";
import { RpcConnection } from "../../typerpc/Rpc";
import { AnyWidget, AnyWidgetConnection } from "../../typerpc/widget/Widget";
import { WidgetViewProps } from "./../../typerpc/widget/WidgetView";

export type WidgetFactory<T extends AnyWidget> = (...args: any[]) => T;

const viewComponentSymbol = Symbol();

declare global {
  interface Object {
    [viewComponentSymbol]: ComponentType<WidgetViewProps<AnyWidgetConnection>>;
  }
}

export type SystemViewProps<
  C extends AnyWidgetConnection
> = C extends AnyInputConnection ? InputViewProps<C> : WidgetViewProps<C>;

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

export type SystemViewRendrerer<T extends AnyWidget> = Renderer<
  SystemViewProps<RpcConnection<T>>,
  [prev: ComponentType<SystemViewProps<RpcConnection<T>>>]
>;

export namespace SystemView {
  export function register<T extends AnyWidget>(
    arg: T | ((...args: any[]) => T) | RpcConnection<T>,
    renderer: SystemViewRendrerer<T>
  ): typeof SystemView {
    const prev =
      (arg as AnyWidgetConnection).$widget?.rpcType?.[viewComponentSymbol] ||
      (arg as AnyWidget).rpcType?.[viewComponentSymbol];

    arg[viewComponentSymbol] = props =>
      (renderer as SystemViewRendrerer<AnyWidget>)(props, prev);

    return SystemView;
  }
}
