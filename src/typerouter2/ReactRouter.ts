import { createContext, ReactNode } from "react";
import { WeakMapFactory } from "../common/map/mapFactory";
import { createUndefinedContext } from "../react/utils/hooks/createUndefinedContext";
import { Route } from "./getRoute";
import { AnyRouter, Router, RouterType, TRouter } from "./Router";
import { AnyRouterLocation, RouterLocation } from "./RouterLocation";

type _RendererProps<T extends TRouter> = {
  location: RouterLocation<T>;
  route: Route;
};
type _WrapperProps<T extends TRouter> = _RendererProps<T> & {
  children: ReactNode;
};
type _Renderer<T extends TRouter> = (props: _RendererProps<T>) => ReactNode;
type _Wrapper<T extends TRouter> = (props: _WrapperProps<T>) => ReactNode;

export type ReactRouterOptions<T extends TRouter> = {
  wrap?: _Wrapper<T>;

  render?: _Renderer<T>;
  renderDefault?: _Renderer<T>;
  renderIndex?: _Renderer<T>;
  renderNoParam?: _Renderer<T>;
};

export type ReactRouter = {
  push(location: AnyRouterLocation);

  find(router);
};

export const ReactRouterContext = createUndefinedContext<ReactRouter>();

export function ReactRouter<T extends TRouter>(
  router: Router<T>,
  options: ReactRouterOptions<T>
) {
  const {
    wrap: wrapper,
    render,
    renderDefault,
    renderIndex,
    renderNoParam,
  } = (options as any) as ReactRouterOptions<TRouter>;

  const info = getReactRouterMetadata(router);

  wrapper && info.wrappers.push(wrapper);

  info.renderer = props => {
    switch (props.route.type) {
      case "DEFAULT":
        if (renderDefault) return renderDefault(props);
        break;
      case "INDEX":
        if (renderIndex) return renderIndex(props);
        break;
      case "NO_PARAM":
        if (renderNoParam) return renderNoParam(props);
        break;
    }

    return render?.(props);
  };
}

export const getReactRouterMetadata = WeakMapFactory((router: AnyRouter) => {
  return {
    wrappers: [] as _Wrapper<TRouter>[],
    renderer: undefined as undefined | _Renderer<TRouter>,
  };
});
