import React, { createElement, ReactElement, useMemo } from "react";
import { Fn, OmitKeys } from "../../common/typings";
import { ReactRouter, ReactRouterOptions } from "../../typerouter2/ReactRouter";
import { Router, TRouter } from "../../typerouter2/Router";
import { AnyWidgetConnection } from "./Widget";
import { WidgetViewProps } from "./WidgetView";
import { WidgetViewLoader } from "./WidgetViewLoader";

export type WidgetViewRouterOptions<
  T extends TRouter,
  C extends AnyWidgetConnection
> = OmitKeys<ReactRouterOptions<T>, "renderIndex"> & {
  renderWidget(
    props: WidgetViewProps<C>,
    indexProps: Parameters<NonNullable<ReactRouterOptions<T>["renderIndex"]>>[0]
  ): ReactElement;
};

export function WidgetRouterView<
  T extends TRouter,
  C extends AnyWidgetConnection
>(
  router: Router<T>,
  connectionOrGetConnection: Exclude<C, Fn> | ((params: T["Params"]) => C),
  optionsOrRenderWidget:
    | WidgetViewRouterOptions<T, C>
    | WidgetViewRouterOptions<T, C>["renderWidget"]
) {
  const getConnection: (params: T["Params"]) => C =
    typeof connectionOrGetConnection === "function"
      ? connectionOrGetConnection
      : () => connectionOrGetConnection;

  const options: WidgetViewRouterOptions<T, C> =
    typeof optionsOrRenderWidget === "function"
      ? { renderWidget: optionsOrRenderWidget }
      : optionsOrRenderWidget;

  const { renderWidget } = options;

  ReactRouter(router, {
    ...options,
    renderIndex(indexProps) {
      const connection = useMemo(
        () => getConnection(indexProps.location.params),
        [indexProps.location.params]
      );
      return (
        <WidgetViewLoader
          connection={connection}
          children={props => createElement(Component, { props, indexProps })}
        />
      );
    },
  });

  function Component({ props, indexProps }) {
    return renderWidget(props, indexProps);
  }
}
