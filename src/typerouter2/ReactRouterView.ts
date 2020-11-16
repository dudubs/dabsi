import { History } from "history";
import { createElement, Fragment, ReactNode, useEffect, useState } from "react";
import { useEmitted } from "../react/reactor/useEmitted";
import { useEmitter } from "../react/reactor/useEmitter";
import { getRoutePropsByPath, RouteProps } from "./RouteProps";
import { getReactRouterMetadata } from "./ReactRouter";
import { AnyRouter } from "./Router";
import { RouterLocation } from "./RouterLocation";

export type ReactRouterViewProps = {
  router: AnyRouter;
  history: History;
};

export function ReactRouterView({
  router: rootRouter,
  history,
}: ReactRouterViewProps) {
  const [route, setRoute] = useState(() =>
    getRoutePropsByPath(rootRouter, history.location.pathname)
  );

  const emit = useEmitter();

  useEmitted(RouterLocation, location => {
    if (location.root.router === rootRouter) {
      setRoute({
        type: "INDEX",
        location,
        path: location.path,
      });
    }
  });

  useEffect(
    () =>
      history.listen(() => {
        setRoute(getRoutePropsByPath(rootRouter, history.location.pathname));
      }),
    [history]
  );

  let children: ReactNode = undefined;

  const routerMetadata = getReactRouterMetadata(route.location.router);
  if (routerMetadata.renderer) {
    children = routerMetadata.renderer({
      emit,
      route,
      location: route.location,
    });
  }

  for (const location of route.location.getParents()) {
    const routerMetadata = getReactRouterMetadata(location.router);
    for (const wrapper of routerMetadata.wrappers) {
      children = wrapper({
        emit,
        children,
        location,
        route,
      });
    }
  }

  return createElement(Fragment, null, children);
}
