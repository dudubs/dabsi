import { createContext, ReactNode } from "react";
import { WeakMapFactory } from "../common/map/mapFactory";
import { ReactorEmitter } from "../react/reactor/useEmitter";
import { EmptyFragment } from "../react/utils/EmptyFragment";
import { createUndefinedContext } from "../react/utils/hooks/createUndefinedContext";
import { RouteProps } from "./RouteProps";
import { AnyRouter, Router, RouterType, TRouter } from "./Router";
import { AnyRouterLocation, RouterLocation } from "./RouterLocation";

type _RendererProps<T extends TRouter, R extends RouteProps = RouteProps> = {
  location: RouterLocation<T>;
  route: R;
  emit: ReactorEmitter;
};
type _WrapperProps<T extends TRouter> = _RendererProps<T> & {
  children: ReactNode;
};
type _Renderer<T extends TRouter, R extends RouteProps = RouteProps> = (
  props: _RendererProps<T, R>
) => ReactNode;
type _Wrapper<T extends TRouter> = (props: _WrapperProps<T>) => ReactNode;

export type ReactRouterOptions<T extends TRouter> = {
  wrap?: _Wrapper<T>;

  render?: _Renderer<T>;
  renderDefault?: _Renderer<T, Extract<RouteProps, { type: "DEFAULT" }>>;
  renderIndex?: _Renderer<T, Extract<RouteProps, { type: "INDEX" }>>;
  renderNoParam?: _Renderer<T, Extract<RouteProps, { type: "NO_PARAM" }>>;
};

export type ReactRouter = {
  push(location: AnyRouterLocation);

  find(router);
};

export const ReactRouterContext = createUndefinedContext<ReactRouter>();

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
        if (renderDefault) return renderDefault(props as any);
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
