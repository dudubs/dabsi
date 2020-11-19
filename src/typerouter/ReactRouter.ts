import { ReactElement, ReactNode } from "react";
import { WeakMapFactory } from "../common/map/mapFactory";
import { createRendererComponent } from "../react/createRendererComponent";
import { ReactorEmitter } from "../react/reactor/useEmitter";
import { createUndefinedContext } from "../react/utils/hooks/createUndefinedContext";
import { Route } from "./Route";
import { AnyRouter, Router, TRouter } from "./Router";
import { AnyRouterLocation, RouterLocation } from "./RouterLocation";

type _RendererProps<T extends TRouter, R extends Route = Route> = {
  location: RouterLocation<T>;
  route: R;
  emit: ReactorEmitter;

  state: any;
  setState: (state: any) => void;
};
type _WrapperProps<T extends TRouter> = _RendererProps<T> & {
  children: ReactNode;
};
type _Renderer<T extends TRouter, R extends Route = Route> = (
  props: _RendererProps<T, R>
) => ReactElement;
type _Wrapper<T extends TRouter> = (props: _WrapperProps<T>) => ReactElement;

export type ReactRouterOptions<T extends TRouter> = {
  wrap?: _Wrapper<T>;

  render?: _Renderer<T>;
  renderDefault?: _Renderer<T, Extract<Route, { type: "DEFAULT" }>>;
  renderIndex?: _Renderer<T, Extract<Route, { type: "INDEX" }>>;
  renderNoParam?: _Renderer<T, Extract<Route, { type: "NO_PARAM" }>>;
};

export type ReactRouter = {
  push(location: AnyRouterLocation);

  find(router);
};

export function ReactRouter<T extends TRouter>(
  router: Router<T>,
  optionsOrRenderer: ReactRouterOptions<T> | _Renderer<T>
) {
  let options: ReactRouterOptions<TRouter>;

  if (typeof optionsOrRenderer === "function") {
    options = { render: optionsOrRenderer as any };
  } else {
    options = optionsOrRenderer as any;
  }

  const {
    wrap: wrapper,
    render,
    renderDefault,
    renderIndex,
    renderNoParam,
  } = options;

  const info = getReactRouterMetadata(router);

  wrapper && info.wrappers.push(wrapper);

  const { renderer: prevRender } = info;

  info.renderer = props => {
    switch (props.route.type) {
      case "DEFAULT":
        if (renderDefault) return props as any;
        break;
      case "INDEX":
        if (renderIndex) return renderIndex(props as any);
        break;
      case "NO_PARAM":
        if (renderNoParam) return renderNoParam(props as any);
        break;
    }
    return (render || prevRender)?.(props);
  };
}

export const getReactRouterMetadata = WeakMapFactory((router: AnyRouter) => {
  return {
    wrappers: [] as _Wrapper<TRouter>[],
    renderer: undefined as undefined | _Renderer<TRouter>,
  };
});
