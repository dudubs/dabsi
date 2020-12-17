import React, { createElement, ReactElement, useMemo } from "react";
import { Fn } from "@dabsi/common/typings2/Fn";
import { OmitKeys } from "@dabsi/common/typings2/OmitKeys";
import { WeakId } from "@dabsi/common/WeakId";
import {
  ReactRouterProps,
  ReactRouterOptions,
  ReactRouterView,
} from "@dabsi/typerouter/ReactRouterView";
import { Router, TRouter } from "@dabsi/typerouter/Router";
import {
  AnyWidgetConnection,
  WidgetElementState,
} from "@dabsi/typerpc/widget/Widget";
import { WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";
import { WidgetViewLoader } from "@dabsi/typerpc/widget/WidgetViewLoader";
import { useProvider } from "@dabsi/react/useProvider";

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

// SystemRouterView
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

  ReactRouterView(router, {
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
          onElementStateChange={state => {
            indexProps.setState(state);
          }}
          connection={connection}
          children={props => createElement(Component, { props, indexProps })}
        />
      );
    },
  });

  function Component({ props, indexProps }) {
    return useProvider()(renderWidget(props, indexProps));
  }
}
