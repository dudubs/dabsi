import { reversed } from "@dabsi/common/array/reversed";
import { Router, RouterType } from "@dabsi/typerouter2/Router";
import { RouterLocation } from "@dabsi/typerouter2/RouterLocation";
import { getRouterViewRenderers } from "@dabsi/typerouter2/view/getRouterViewRenderers";
import { RouterViewRenderer } from "@dabsi/typerouter2/view/RouterView";
import EmptyFragment from "@dabsi/view/react/utils/EmptyFragment";
import React from "react";
import { render } from "react-dom";

// BrowserRouterView...
export type BaseRouterViewProps = {
  routerType: RouterType;
  path: string;
};

export function BaseRouterView(p: BaseRouterViewProps) {
  const wrappers = React.useMemo(() => {
    const wrappers: ((element, stack) => React.ReactElement)[] = [];
    const path = RouterLocation.parse(p.routerType, p.path);

    let depth = 0;

    for (let location = path.location; location; location = location.parent!) {
      const locationDepth = depth++;

      wrappers.push((element, stack) => {
        if (location.route) {
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
    return wrappers;
  }, [p.routerType, p.path]);

  let element: React.ReactElement = EmptyFragment;
  let stack = {};

  for (const wrapper of wrappers) {
    element = wrapper(element, stack);
  }
  return element;
}
