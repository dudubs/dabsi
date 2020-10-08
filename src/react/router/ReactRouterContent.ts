/*
 for (let router: AnyRouter | undefined = route.router; router; router = router.parent) {
                const isContent = route.router === router;
                const isContainer = !isContent;
                const isIndex = isContent && (!lastPath);
                const isDefault = isContent && !!lastPath;
            }
 */
import { createElement, Fragment, ReactNode } from "react";
import { Route } from "../../router";
import { useDefinedContext } from "../utils/hooks/useDefinedContext";
import { AnyReactRouterOld, ReactRouterRenderers } from "./OldReactRouter";
import { ReactRouterLocationOld } from "./ReactRouterLocation";

export function ReactRouterContent({
  children = undefined,
}: {
  children?: ReactNode;
}) {
  const { path, route: contentRoute } = useDefinedContext(
    ReactRouterLocationOld
  );

  for (
    let route: undefined | Route<AnyReactRouterOld> = contentRoute;
    !!route;
    route = <any>route.parent
  ) {
    const { router } = route;

    const isContent = route === contentRoute;
    const isContainer = !isContent;
    const isIndex = isContent && (!path || path === "/");
    const isDefault = isContent && !isIndex;

    for (let render of ReactRouterRenderers(router)) {
      children = render({
        children,
        route,
        path,
        contentRoute,
        isContent,
        isContainer,
        isIndex,
        isDefault,
      });
    }
  }

  return createElement(Fragment, { children });
}
