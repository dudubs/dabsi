import { createElement, ReactElement } from "react";
import { flatToSeq } from "../common/flatToSeq";
import { EmptyFragment } from "../react/utils/EmptyFragment";
import { useDefinedContext } from "../react/utils/hooks/useDefinedContext";
import { getReactRouterProps } from "./ReactRouter";
import { ReactRouterContext } from "./ReactRouterLocation";

export function ReactRouterContentView() {
  return renderReactRouterContainer(useDefinedContext(ReactRouterContext));
}

export function renderReactRouterContainer(routeProps: ReactRouterContext) {
  const routerProps = getReactRouterProps(routeProps.location.router);

  let children: ReactElement;

  if (routerProps.renderer) {
    children = routerProps.renderer(routeProps);
  } else {
    const defaultRenderer = flatToSeq(
      routeProps.location,
      location => location.parent
    )
      .map(location => location.router.reactProps.defaultRenderer)
      .find(defaultRenderer => !!defaultRenderer);

    if (defaultRenderer) {
      children = defaultRenderer(routeProps);
    } else {
      children = EmptyFragment;
    }
  }

  for (
    let location = routeProps.location;
    location;
    location = location.parent
  ) {
    const props = getReactRouterProps(location.router);
    const wrapperProps = {
      location: location,
      route: routeProps,
      children,
    };
    for (const wrapper of props.wrappers) {
      children = createElement(wrapper, wrapperProps);
    }
  }

  return children;
}
// OuterWrappers
// InnerWrappers
