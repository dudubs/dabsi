import { SystemView } from "@dabsi/system/core/view/SystemView";
import { useSystemViewBuilders } from "@dabsi/system/core/view/useBuilders";
import { RpcConnection } from "@dabsi/old-typerpc/Rpc";
import {
  AnyWidget,
  AnyWidgetConnection,
  isWidget,
  isWidgetConnection,
} from "@dabsi/old-typerpc/widget/Widget";
import React, { createElement } from "react";

type Renderer<C extends AnyWidgetConnection> = (
  props: SystemView.Props<C>,
  component: undefined | ((props: SystemView.Props<C>) => React.ReactElement)
) => SystemView.Props<C> | React.ReactElement;

export type SystemViewDefiner = {
  <T extends AnyWidget>(
    widgetOrWidgetType: T | ((...args: any[]) => T),
    renderer: (
      props: SystemView.Props<RpcConnection<T>>,
      prev: React.ComponentType<SystemView.Props<RpcConnection<T>>>
    ) => React.ReactElement
  ): void;

  <C extends AnyWidgetConnection>(
    connection: C,
    renderer: (
      props: SystemView.Props<C>,
      prev: React.ComponentType<SystemView.Props<C>>
    ) => React.ReactElement
  ): void;
};

export const useSystemView: {
  <T extends AnyWidget>(widget: T, renderer: Renderer<RpcConnection<T>>): void;

  <C extends RpcConnection<AnyWidget>>(
    connection: C,
    renderer: Renderer<C>
  ): void;

  (callback: (define: SystemViewDefiner) => void): void;
} = (...args) => {
  useSystemViewBuilders().push(componentMap => {
    if (args.length === 2) {
      const [widgetOrConnection, renderer] = args;
      const widget = isWidget(widgetOrConnection)
        ? widgetOrConnection
        : widgetOrConnection.$widget;
      const prevRenderer =
        componentMap.get(widget) ||
        (widget.rpcType && componentMap.get(widget.rpcType));

      componentMap.set(widget, props => {
        const result = renderer(props, prevRenderer);
        if (React.isValidElement(result)) return result;
        return createElement(prevRenderer!, result);
      });
    } else {
      const [callback] = args;
      callback((x, renderer) => {
        if (isWidgetConnection(x)) {
          x = x.$widget;
        }
        const prevRenderer =
          componentMap.get(x) || componentMap.get((x as AnyWidget).rpcType);
        componentMap.set(x, props => {
          return renderer(props, prevRenderer);
        });
      });
    }
  });
};
