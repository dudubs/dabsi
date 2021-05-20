import { defined } from "@dabsi/common/object/defined";
import { entries } from "@dabsi/common/object/entries";
import { IsNever } from "@dabsi/common/typings2/boolean/IsNever";
import { getRouterMetadata } from "@dabsi/typerouter2/getRouterMetadata";
import {
  InferredRouterChildRouter,
  Router,
  RouterChild,
  RouterChildKey,
  RouterType,
  RouteWithParams,
} from "@dabsi/typerouter2/Router";
import { RouterLocationPath } from "@dabsi/typerouter2/RouterLocation";
import {
  BaseRouterView,
  BaseRouterViewProps,
} from "@dabsi/typerouter2/view/BaseRouterView";
import { buildRouterViews } from "@dabsi/typerouter2/view/buildRouterViews";

import { getRouterViewRenderers } from "@dabsi/typerouter2/view/getRouterViewRenderers";
import { RouterHistory } from "@dabsi/typerouter2/view/RouterHistory";
import { ReactWrapper } from "@dabsi/view/react/ReactWrapper";
import { Renderer } from "@dabsi/view/react/renderer";
import { History } from "history";
import React, { ReactElement } from "react";

export type RouterViewRendererProps<
  T extends Router,
  P extends any[],
  S,
  R extends Router
> = {
  router: T;
  path: RouterLocationPath;
  children: ReactElement;
  stack: S;
  history: RouterHistory;
  root: R;
  useParams<T>(callback: (...params: P) => T): T;
};

export type RouterChildRenderer<T, S, R extends Router> = T extends RouterChild<
  infer T,
  infer P
>
  ? Renderer<RouterViewRendererProps<T, P, S, R>>
  : never;

export type InferredRouterParams<
  T extends Router,
  K extends keyof T
> = T[K] extends RouteWithParams<any, infer U> ? U : never;

export type RouterViewRenderer<
  T extends Router,
  S,
  R extends Router
> = Renderer<RouterViewRendererProps<T, [], S, R>>;

export type RouterViewStackWithChild<
  T extends RouterChild,
  K extends PropertyKey,
  S
> = S & Record<K, InferredRouterChildRouter<T>>;

type RendererOrObject<R extends Renderer<any>, O> = R | O | (R | O)[];

export type RouterViewProps = Omit<BaseRouterViewProps, "path"> & {
  history: History;
};
export function RouterView({ history, ...props }: RouterViewProps) {
  const [path, setPath] = React.useState(() => history.location.pathname);

  React.useEffect(
    () =>
      history.listen(event => {
        setPath(event.location.pathname);
      }),
    [history]
  );

  return BaseRouterView({
    ...props,
    path,
    setPath(path) {
      history.push(path);
    },
  });
}
export type RouterChildRendererMap<T extends Router, S, R extends Router> =
  //
  IsNever<RouterChildKey<T>> extends true
    ? never
    : {
        [K in RouterChildKey<T>]?: RendererOrObject<
          RouterChildRenderer<
            T[K],
            //
            RouterViewStackWithChild<T[K], K, S>,
            R
          >,
          | RouterChildRendererMap<
              InferredRouterChildRouter<T[K]>,
              RouterViewStackWithChild<T[K], K, S>,
              R
            >
          | {
              $wrapper: RouterChildRenderer<
                T[K],
                RouterViewStackWithChild<T[K], K, S>,
                R
              >;
            }
        >;
      } & {
        $wrapper?: RouterChildRendererMap<T, {}, R>;
      };

export namespace RouterView {
  function createRendererComponent(
    renderer: RouterViewRenderer<any, any, any>
  ) {
    return props => ReactWrapper(() => renderer(props));
  }

  export function define<T extends Router>(
    routerType: RouterType<T>,
    options: RendererOrObject<
      RouterViewRenderer<T, {}, T>,
      | RouterChildRendererMap<T, {}, T>
      | {
          $wrapper: RouterViewRenderer<T, {}, T>;
        }
    >
  );

  export function define(routerType, options) {
    buildRouterViews.builders.push(() => {
      define(routerType, options, 0);

      function define(routerType, options, depth) {
        if (Array.isArray(options)) {
          for (const arg of options) {
            define(routerType, arg, depth);
          }
          return;
        }

        const children = getRouterMetadata(routerType);

        if (typeof options.$wrapper === "function") {
          getRouterViewRenderers(routerType).wrappers.push({
            renderer: options.$wrapper,
            depth,
          });
          return;
        }

        if (typeof options !== "function") {
          for (const [childPropertyName, childOptions] of entries(options)) {
            const childMetadata = defined(
              children.routePropertyMap[childPropertyName],
              () =>
                `No router child like "${routerType.name}.${childPropertyName}".`
            );
            define(childMetadata.type, childOptions, depth + 1);
          }
          return;
        }

        getRouterViewRenderers(routerType).index.push({
          renderer: createRendererComponent(options),
          depth,
        });
      }
    });
  }
}
