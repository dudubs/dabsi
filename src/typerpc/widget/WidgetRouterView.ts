import { Awaitable } from "@dabsi/common/typings2/Async";
import { Store } from "@dabsi/store";
import { RouterLocation } from "@dabsi/typerouter/location";
import Router, { TRouter } from "@dabsi/typerouter/router";
import { RouterView } from "@dabsi/typerouter/view";
import { RouteViewComponent } from "@dabsi/typerouter/view/route";
import { loadWidgetViewProps } from "@dabsi/typerpc/widget/loadWidgetViewProps";
import {
  AnyWidgetConnection,
  WidgetElementState,
} from "@dabsi/typerpc/widget/Widget";
import { WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";
import { ReactWrapper } from "@dabsi/view/react/wrapper";

export namespace WidgetRouterView {
  export type Renderer<C extends AnyWidgetConnection, R extends TRouter, D> = (
    props: WidgetViewProps<C>,
    routerProps: RouteViewComponent.Props<R, D>
  ) => React.ReactElement;

  export type Options<
    C extends AnyWidgetConnection,
    R extends TRouter,
    D
  > = RouteViewComponent.Options<R, D> & {
    widgetState?: WidgetElementState<C>;
  };

  export type Loader<
    C extends AnyWidgetConnection,
    R extends TRouter,
    D
  > = RouteViewComponent.Loader<R, D>;

  export type ConnectionOrGetConnection<
    C extends AnyWidgetConnection,
    R extends TRouter
  > = C | ((params: R["Params"], location: RouterLocation<R>) => C);

  export const define = ((...args) => {
    let router;
    let connectionOrGetConnection;
    let options;
    let loader: null | ((params, _: { location; connection }) => Awaitable);
    let renderer: Renderer<any, any, any>;

    if (args.length === 3) {
      [router, connectionOrGetConnection, renderer] = args;
      [loader, options] = [null, null];
    } else if (args.length === 4) {
      let optionsOrLoader;
      [router, connectionOrGetConnection, optionsOrLoader, renderer] = args;
      [options, loader] =
        typeof optionsOrLoader === "function"
          ? [null, optionsOrLoader]
          : [optionsOrLoader, null];
    } else if (args.length === 5) {
      [router, connectionOrGetConnection, options, loader, renderer] = args;
    } else {
      throw new TypeError("Can't parse args.");
    }

    const getConnection: (params, location) => AnyWidgetConnection =
      typeof connectionOrGetConnection === "function"
        ? connectionOrGetConnection
        : () => connectionOrGetConnection;

    const { widgetState, ...routerOptions } = options || {};

    RouterView.define(
      router,
      routerOptions,
      (params, location) => {
        const connection = getConnection(params, location);
        return Promise.all([
          loadWidgetViewProps(
            connection,
            // later will be location-store.
            Store.const(widgetState)
          ),
          loader?.(params, { connection, location }),
        ]);
      },
      ({ data: [viewProps, data], ...routerProps }) => {
        return ReactWrapper(() =>
          renderer(viewProps, { ...routerProps, data })
        );
      }
    );
  }) as {
    <C extends AnyWidgetConnection, R extends TRouter, D>(
      router: Router<R>,
      connectionOrGetConnection: ConnectionOrGetConnection<C, R>,
      renderer: Renderer<C, R, D>
    ): void;

    <C extends AnyWidgetConnection, R extends TRouter, D>(
      router: Router<R>,
      connectionOrGetConnection: ConnectionOrGetConnection<C, R>,
      loader: Loader<C, R, D>,
      renderer: Renderer<C, R, D>
    ): void;

    <C extends AnyWidgetConnection, R extends TRouter, D>(
      router: Router<R>,
      connectionOrGetConnection: ConnectionOrGetConnection<C, R>,
      loader: Loader<C, R, D>,
      options: Options<C, R, D>,
      renderer: Renderer<C, R, D>
    ): void;

    <C extends AnyWidgetConnection, R extends TRouter, D>(
      router: Router<R>,
      connectionOrGetConnection: ConnectionOrGetConnection<C, R>,
      options: Options<C, R, D>,
      renderer: Renderer<C, R, D>
    ): void;
  };
}
