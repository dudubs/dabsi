import React, { createElement, ReactElement, useMemo } from "react";
import { Fn } from "../../common/typings2/Fn";
import { OmitKeys } from "../../common/typings2/OmitKeys";
import { WeakId } from "../../common/WeakId";
import {
  ReactRouterProps,
  ReactRouterOptions,
} from "../../typerouter/ReactRouterView";
import { Router, TRouter } from "../../typerouter/Router";
import { AnyWidgetConnection, WidgetElementState } from "./Widget";
import { WidgetViewProps } from "./WidgetView";
import { WidgetViewLoader } from "./WidgetViewLoader";

type IndexProps<T extends TRouter> = Parameters<
  NonNullable<ReactRouterOptions<T>["renderIndex"]>
>[0];

export type WidgetViewRouterOptions<
  T extends TRouter,
  C extends AnyWidgetConnection
> = OmitKeys<ReactRouterOptions<T>, "renderIndex"> & {
  getElementState?: (props: IndexProps<T>) => WidgetElementState<C>;
  renderWidget(
    props: WidgetViewProps<C>,
    indexProps: IndexProps<T>
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

  const { renderWidget, getElementState } = options;

  ReactRouter(router, {
    ...options,
    renderIndex(indexProps) {
      const connection = useMemo(
        () => getConnection(indexProps.location.params),
        [indexProps.location.params]
      );
      return (
        <WidgetViewLoader
          key={WeakId(indexProps.location)}
          elementState={indexProps.state}
          onElementStateChange={(state) => {
            indexProps.setState(state);
          }}
          connection={connection}
          children={(props) => createElement(Component, { props, indexProps })}
        />
      );
    },
  });

  function Component({ props, indexProps }) {
    return renderWidget(props, indexProps);
  }
}
