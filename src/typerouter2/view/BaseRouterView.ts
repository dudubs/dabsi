import { reversed } from "@dabsi/common/array/reversed";
import { Router, RouterType } from "@dabsi/typerouter2/Router";
import { RouterLocation } from "@dabsi/typerouter2/RouterLocation";
import { buildRouterViews } from "@dabsi/typerouter2/view/buildRouterViews";
import { getRouterViewRenderers } from "@dabsi/typerouter2/view/getRouterViewRenderers";
import { RouterViewRenderer } from "@dabsi/typerouter2/view/RouterView";
import { ReactContext } from "@dabsi/view/react/ReactContext";
import EmptyFragment from "@dabsi/view/react/utils/EmptyFragment";
import React from "react";
import { RouterHistory } from "./RouterHistory";

// BrowserRouterView...
export type BaseRouterViewProps = {
  routerType: RouterType;
  path: string;
  setPath?(path: string): void;
};

export function BaseRouterView(p: BaseRouterViewProps) {
  buildRouterViews();

  const [path, setPath] = React.useState(() => {
    return RouterLocation.parse(p.routerType, p.path);
  });

  const [wrappers] = React.useMemo(() => {
    const wrappers: ((element, stack) => React.ReactElement)[] = [];

    let depth = 0;

    for (let location = path.location; location; location = location.parent!) {
      const locationDepth = depth++;

      wrappers.push((element, stack) => {
        if (location.route?.propertyName) {
          stack[location.route.propertyName] = new Router(location);
        }
        const thisStack = { ...stack };

        const useParams = (callback: any) => {
          return React.useMemo(
            () => callback(...location.params),
            location.params
          );
        };

        const applyRenderers = (renderers: RouterViewRenderer<any, any>[]) => {
          for (const renderer of reversed(renderers)) {
            element = renderer({
              children: element,
              router,
              path,
              stack: thisStack,
              useParams,
            });
          }
        };

        const router = new location.routerType(location);

        for (
          let routerType = location.routerType;
          routerType !== Router;
          routerType = Object.getPrototypeOf(routerType)
        ) {
          const renderers = getRouterViewRenderers(routerType, true);

          if (!renderers) continue;

          if (!locationDepth && path.type === "index") {
            applyRenderers(renderers.index);
          }

          applyRenderers(renderers.wrappers);
        }
        return element;
      });
    }
    return [wrappers, path];
  }, [p.routerType, path]);

  let element: React.ReactElement = EmptyFragment;
  let stack = {};

  for (const wrapper of wrappers) {
    element = wrapper(element, stack);
  }
  return React.createElement(ReactContext.Provider, {
    deps: [path],
    entries: [
      [RouterLocation, path.location],
      [
        RouterHistory,
        new RouterHistory(location => {
          setPath({ type: "index", location });
          p.setPath?.(location.path);
        }),
      ],
    ],
    children: element,
  });
}
