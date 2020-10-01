import { History } from "History";
import {
  createElement,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { If, IsEmptyObject, PartialUndefinedKeys } from "../common/typings";
import { Renderer } from "../react/renderer";
import { TReactRouter } from "./ReactRouter";
import {
  ReactRouterLocation,
  ReactRouterRouteProps,
  ReactRouterRoutePropsContext,
} from "./ReactRouterLocation";
import { AnyRouter, Router, RouterPlugin } from "./Router";

export function ReactRouterView<T extends TReactRouter>({
  router: unboundRouter,
  history,
  ...props
}: PartialUndefinedKeys<
  {
    context: T["context"] | If<IsEmptyObject<T["context"]>, undefined>;
  },
  {
    history: History;
    children: ReactNode;
    router: Router<T>;
    listen?: (callback: (path: string) => void) => () => void;
    path?: string;

    plugins?: RouterPlugin<T>[];

    renderRoute?: Renderer<{
      children: ReactElement;
      route: ReactRouterRouteProps;
    }>;
  }
>) {
  const [route, setRoute] = useState<ReactRouterRouteProps>(() =>
    getRoute(history.location.pathname)
  );

  const router = useMemo(() => {
    return unboundRouter.bind(props["context"] || {});
  }, [unboundRouter]);

  useEffect(() => {
    return history.listen((location) => {
      setRoute(getRoute(location.pathname));
    });
  }, [history]);

  let children: ReactElement = createElement(
    ReactRouterRoutePropsContext.Provider,
    {
      value: route,
      children: props.children,
    }
  );

  if (props.renderRoute) {
    children = props.renderRoute({
      route,
      children,
    });
  }

  return children;

  function getRoute(path: string) {
    return new ReactRouterLocation<any>(null, null, history, router, {}).route(
      path
    );
  }
}
