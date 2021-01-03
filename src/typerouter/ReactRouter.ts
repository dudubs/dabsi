import { useHistory } from "./History";
import { History } from "history";
import {
  createElement,
  Fragment,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useEmittedWithoutState } from "@dabsi/react/reactor/useEmittedWithoutState";
import { useEmitter } from "@dabsi/react/reactor/useEmitter";
import { createUndefinedContext } from "@dabsi/react/utils/hooks/createUndefinedContext";
import { useDefinedContext } from "@dabsi/react/utils/hooks/useDefinedContext";
import { getReactRouterMetadata } from "@dabsi/typerouter/ReactRouterView";
import { getRouteByPath, Route } from "@dabsi/typerouter/Route";
import { AnyRouter, Router, TRouter } from "@dabsi/typerouter/Router";
import { RouterEvent } from "@dabsi/typerouter/RouterEvent";
import { RouterLocation } from "@dabsi/typerouter/RouterLocation";

export type ReactRouterViewProps = {
  router: AnyRouter;
};

export function ReactRouter({ router: rootRouter }: ReactRouterViewProps) {
  const emit = useEmitter();

  const history = useHistory();
  const [state, setState] = useState(() => {
    const route = getRouteByHistory();
    return {
      route,
      element: createRouteElement(route, history.location.state),
    };
  });

  useEmittedWithoutState(
    RouterEvent,
    event => {
      switch (event.type) {
        case "push":
          {
            const { location } = event;
            if (
              location.root.router === rootRouter &&
              location.path !== state.route.location.path
            ) {
              let { path } = location;
              if (event.redirection?.type === "location") {
                path += `?redirection=${encodeURIComponent(
                  JSON.stringify({
                    type: "location",
                    path: event.redirection.location.path,
                  })
                )}`;
              }
              history.push(path);

              pushRoute({
                type: "INDEX",
                location,
                path: location.path,
              });
            }
          }
          break;
      }
    },
    [state]
  );

  useEffect(
    () =>
      history.listen(() => {
        if (history.location.pathname !== state.route.location.path) {
          pushRoute(getRouteByHistory());
        }
      }),
    [history, state]
  );

  return createElement(ReactRouterContext.Provider, {
    value: { route: state.route, router: rootRouter, history },
    children: state.element,
  });

  function setLocationState(state) {
    history.replace(history.location.pathname, {
      ...(typeof history.location.state === "object"
        ? history.location.state
        : null),
      ...state,
    });
  }

  function pushRoute(route: Route) {
    setState({
      route,
      element: createRouteElement(route, undefined),
    });
  }

  function createRouteElement(route: Route, state) {
    let children: ReactNode = undefined;

    const routerMetadata = getReactRouterMetadata(route.location.router);

    if (routerMetadata.renderer) {
      const path = route.location.path;
      children = createElement(routerMetadata.renderer, {
        key: path + ":index",
        emit,
        route,
        location: route.location,
        state: state?.[path],
        setState(state) {
          setLocationState({ [path]: state });
        },
      });
    }

    for (const location of route.location.getParents()) {
      const path = route.location.path;
      const routerMetadata = getReactRouterMetadata(location.router);
      for (const [index, wrapper] of routerMetadata.wrappers.entries()) {
        children = createElement(wrapper, {
          key: location.path + ":wrapper:" + index,
          emit,
          children,
          location,
          route,
          state: state?.[path],
          setState(state) {
            setLocationState({ [path]: state });
          },
        });
      }
    }

    return createElement(Fragment, null, children);
  }

  function getRouteByHistory() {
    return getRouteByPath(
      RouterLocation.create(rootRouter, emit),
      history.location.pathname
    );
  }
}

type ReactRouter = {
  route: Route;
  router: Router;
  history: History;
};

const ReactRouterContext = createUndefinedContext<ReactRouter>();

export function useReactRouter(): ReactRouter {
  return useDefinedContext(ReactRouterContext);
}
export function useRoute(): Route {
  return useDefinedContext(ReactRouterContext).route;
}

export function useRouterLocation<T extends TRouter>(
  router: Router<T>
): RouterLocation<T> {
  const { route, router: rootRouter } = useDefinedContext(ReactRouterContext);
  return useMemo(() => route.location.find(router)!, [router, rootRouter]);
}
