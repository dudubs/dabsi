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
import { TReactRouter } from "./ReactRouter";
import {
  ReactRouterLocation,
  ReactRouterRouteProps,
  ReactRouterRoutePropsContext,
} from "./ReactRouterLocation";
import { Router, RouterPlugin } from "./Router";

export type ReactRouterViewProps<T extends TReactRouter> = PartialUndefinedKeys<
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
  }
>;

export function ReactRouterView<T extends TReactRouter>(
  props: ReactRouterViewProps<T>
) {
  const { plugins, router: unboundRouter, context, history } = <
    ReactRouterViewProps<TReactRouter>
  >props;

  const router = useMemo(() => {
    if (!plugins) return unboundRouter;
    return unboundRouter.bind(context || {}, plugins);
  }, [unboundRouter, plugins]);

  const [route, setRoute] = useState<ReactRouterRouteProps>(() =>
    getRouteFromPath(history.location.pathname)
  );

  useEffect(() => {
    if (route.location.router !== router) {
      setRoute(getRouteFromPath(history.location.pathname));
    }
  }, [router]);

  useEffect(
    () =>
      history.listen((location) => {
        setRoute(getRouteFromPath(location.pathname));
      }),
    [history, router]
  );

  let children: ReactElement = createElement(
    ReactRouterRoutePropsContext.Provider,
    {
      value: route,
      children: props.children,
    }
  );

  return children;

  function getRouteFromPath(path: string) {
    return new ReactRouterLocation<any>(null, null, history, router, {}).route(
      path
    );
  }
}
