import { ReactElement } from "react";
import { TReactRouter } from "../../typerouter/ReactRouter";
import { ReactRouterContext } from "../../typerouter/ReactRouterLocation";
import { Router } from "../../typerouter/Router";
import { RpcConnection, RpcType } from "../Rpc";
import { TInlineWidget } from "./inline-widget/InlineWidget";
import { AnyPage, Page, PageElement } from "./page/Page";
import {
  AnyWidget,
  AnyWidgetConnection,
  WidgetElement,
  WidgetType,
} from "./Widget";

export type TWidgetViewRouter = TReactRouter & {
  routerType: typeof WidgetViewRouter;
};

export namespace WidgetViewRouter {
  export function renderPage<
    R extends TWidgetViewRouter,
    C extends RpcConnection<AnyPage>,
    T extends TInlineWidget = WidgetType<C>["TInlineWidget"],
    Target extends AnyWidget = NonNullable<T["Target"]>
  >(
    this: Router<R>,
    getConnection: (params: R["params"], props: ReactRouterContext<R>) => C,
    render: (
      props: ReactRouterContext<R> & {
        page: PageElement;
        widget: {
          connection: RpcConnection<Target>;
          element: WidgetType<Target>["Element"];
        };
      }
    ) => ReactElement
  ): Router<R> {
    return this.renderWidget(getConnection, props => {
      const {
        widget: {
          element: [page, element],
          connection,
        },
      } = props;
      return render({
        ...props,
        page,
        widget: {
          element,
          connection: connection.target,
        },
      });
    });
  }

  export function renderWidget<
    T extends TReactRouter,
    C extends AnyWidgetConnection
  >(
    this: Router<T>,
    getConnection: (params: T["params"], props: ReactRouterContext<T>) => C,
    render: (
      props: ReactRouterContext<T> & {
        widget: {
          connection: C;
          element: WidgetElement<C>;
        };
      }
    ) => ReactElement
  ) {
    return this.loadAndRender(async props => {
      const connection = getConnection(props.location.params, props);
      const renderProps = {
        ...props,
        widget: {
          connection,
          element: await connection.getElement(),
        },
      };
      return () => {
        return render(renderProps);
      };
    });
  }
}
