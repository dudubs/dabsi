import { History } from "history";
import { defined } from "@dabsi/common/object/defined";
import { entries } from "@dabsi/common/object/entries";
import { getRouterChildren } from "@dabsi/typerouter2/getRouterChildren";
import {
  InferredRouterChildRouter,
  Router,
  RouterChild,
  RouterChildKey,
  RouterType,
  RouteWithParams,
} from "@dabsi/typerouter2/Router";
import { RouterLocationPath } from "@dabsi/typerouter2/RouterLocation";
import { getRouterViewRenderers } from "@dabsi/typerouter2/view/getRouterViewRenderers";
import {
  BaseRouterView,
  BaseRouterViewProps,
} from "@dabsi/typerouter2/view/BaseRouterView";
import { ReactWrapper } from "@dabsi/view/react/ReactWrapper";
import { Renderer } from "@dabsi/view/react/renderer";
import { ReactElement } from "react";
import { Override } from "@dabsi/common/typings2/Override";
import React from "react";

export type RouterViewRendererProps<T extends Router, P extends any[], S> = {
  router: T;
  path: RouterLocationPath;
  children: ReactElement;
  stack: S;
  useParams<T>(callback: (...params: P) => T): T;
};

export type RouterChildRenderer<T, S> = T extends RouterChild<infer T, infer P>
  ? Renderer<RouterViewRendererProps<T, P, S>>
  : never;

export type InferredRouterParams<
  T extends Router,
  K extends keyof T
> = T[K] extends RouteWithParams<any, infer U> ? U : never;

export type RouterViewRenderer<T extends Router, S> = Renderer<
  RouterViewRendererProps<T, [], S>
>;

export type RouterViewStackWithChild<
  T extends RouterChild,
  K extends PropertyKey,
  S
> = S & Record<K, InferredRouterChildRouter<T>>;

export type RouterChildRendererMap<T extends Router, S> = {
  [K in RouterChildKey<T>]?: RendererOrObject<
    RouterChildRenderer<T[K], RouterViewStackWithChild<T[K], K, S>>,
    | RouterChildRendererMap<
        InferredRouterChildRouter<T[K]>,
        RouterViewStackWithChild<T[K], K, S>
      >
    | {
        $wrapper: RouterChildRenderer<
          T[K],
          RouterViewStackWithChild<T[K], K, S>
        >;
      }
  >;
} & {
  $wrapper?: RouterChildRendererMap<T, {}>;
};

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

  return BaseRouterView({ ...props, path });
}

export namespace RouterView {
  function createRendererComponent(renderer: RouterViewRenderer<any, any>) {
    return props => ReactWrapper(() => renderer(props));
  }

  export function define<T extends Router>(
    routerType: RouterType<T>,
    options: RendererOrObject<
      RouterViewRenderer<T, {}>,
      | RouterChildRendererMap<T, {}>
      | {
          $wrapper: RouterViewRenderer<T, {}>;
        }
    >
  );

  export function define(routerType, options) {
    if (Array.isArray(options)) {
      for (const arg of options) {
        define(routerType, arg);
      }
      return;
    }

    const children = getRouterChildren(routerType);

    if (typeof options.$wrapper === "function") {
      getRouterViewRenderers(routerType).wrappers.push(options.$wrapper);
      return;
    }

    if (typeof options !== "function") {
      for (const [childPropertyName, childOptions] of entries(options)) {
        const childMetadata = defined(
          children.propertyNameMap[childPropertyName],
          () =>
            `No router child like "${routerType.name}.${childPropertyName}".`
        );
        define(childMetadata.type, childOptions);
      }
      return;
    }

    getRouterViewRenderers(routerType).index.push(
      createRendererComponent(options)
    );
  }
}
