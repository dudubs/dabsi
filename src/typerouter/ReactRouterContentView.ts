import { ReactElement, ReactNode } from "react";
import { flatToSeq } from "../common/flatToSeq";
import { EmptyFragment } from "../react/utils/EmptyFragment";
import { useDefinedContext } from "../react/utils/hooks/useDefinedContext";
import { getReactRouterProps } from "./ReactRouter";
import {
  ReactRouterRouteProps,
  ReactRouterRoutePropsContext,
} from "./ReactRouterLocation";

export function ReactRouterContentView(props: {
  renderEffect?(props: {
    direct: "nextToBack" | "backToNext";
    next: ReactNode;
    back: ReactNode;
  });
}) {
  return renderReactRouterContainer(
    useDefinedContext(ReactRouterRoutePropsContext)
  );
}

export function renderReactRouterContainer(routeProps: ReactRouterRouteProps) {
  const routerProps = getReactRouterProps(routeProps.location.router);

  let children: ReactElement;

  if (routerProps.renderer) {
    children = routerProps.renderer(routeProps);
  } else {
    const defaultRenderer = flatToSeq(
      routeProps.location,
      (location) => location.parent
    )
      .map((location) => location.router.reactProps.defaultRenderer)
      .find((defaultRenderer) => !!defaultRenderer);

    if (defaultRenderer) {
      children = defaultRenderer(routeProps);
    } else {
      children = EmptyFragment;
    }
  }

  for (
    let parent = routeProps.location.parent;
    parent;
    parent = parent.parent
  ) {
    const props = getReactRouterProps(parent.router);
    const wrapperProps = {
      location: parent,
      route: routeProps,
      children,
    };
    for (const wrapper of props.wrappers) {
      children = wrapper(wrapperProps);
    }
  }

  return children;
}
