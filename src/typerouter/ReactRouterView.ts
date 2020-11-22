import { History } from "history";
import {
  createContext,
  createElement,
  Fragment,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useEmitted } from "../react/reactor/useEmitted";
import { useEmitter } from "../react/reactor/useEmitter";
import { getReactRouterMetadata } from "./ReactRouter";
import { getRouteByPath, Route } from "./Route";
import { AnyRouter } from "./Router";
import { RouterLocation } from "./RouterLocation";

export type ReactRouterViewProps = {
  router: AnyRouter;
  history: History<any>;
};

const HistoryContext = createContext<History>(undefined!);

// emit(new LocationState(...))

// HistoryAction(()=> {})

// useDefaultEmitted(History, myHistory);

export function ReactRouterView({
  router: rootRouter,
  history,
}: ReactRouterViewProps) {
  const emit = useEmitter();

  const [routerState, setRouterState] = useState(() => {
    const route = getRouteByHistory();
    return {
      route,
      element: createRouteElement(route, history.location.state),
    };
  });

  useEmitted(
    RouterLocation,
    location => {
      if (
        location.root.router === rootRouter &&
        location.path !== routerState.route.location.path
      ) {
        history.push(location.path);
        pushRoute({
          type: "INDEX",
          location,
          path: location.path,
        });
      }
    },
    [routerState]
  );

  useEffect(
    () =>
      history.listen(() => {
        if (history.location.pathname !== routerState.route.location.path) {
          pushRoute(getRouteByHistory());
        }
      }),
    [history, routerState]
  );

  return routerState.element;

  function setLocationState(state) {
    history.replace(history.location.pathname, {
      ...history.location.state,
      ...state,
    });
  }

  function pushRoute(route: Route) {
    setRouterState({
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
