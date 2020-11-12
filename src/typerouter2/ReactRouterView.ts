import { History } from "history";
import { createElement, Fragment, ReactNode, useEffect, useState } from "react";
import { useEmitted } from "../react/useEmitted";
import { getRouteByPath } from "./getRoute";
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
    getRouteByPath(rootRouter, history.location.pathname)
  );

  useEmitted(RouterLocation, location => {
    if (location.root.router === rootRouter) {
      setRoute({
        location,
        type: "INDEX",
        rootPath: location.path,
      });
    }
  });

  useEffect(
    () =>
      history.listen(() => {
        setRoute(getRouteByPath(rootRouter, history.location.pathname));
      }),
    [history]
  );

  let children: ReactNode = undefined;

  const routerMetadata = getReactRouterMetadata(route.location.router);
  if (routerMetadata.renderer) {
    children = routerMetadata.renderer({
      route: route,
      location: route.location,
    });
  }

  for (const location of route.location.getParents()) {
    const routerMetadata = getReactRouterMetadata(location.router);
    for (const wrapper of routerMetadata.wrappers) {
      children = wrapper({
        children,
        location,
        route,
      });
    }
  }

  return createElement(Fragment, null, children);
}
