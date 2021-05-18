import { reversed } from "@dabsi/common/array/reversed";
import { defined } from "@dabsi/common/object/defined";
import {
  getRouterLocation,
  Router,
  RouterType,
} from "@dabsi/typerouter2/Router";
import { RouterLocation } from "@dabsi/typerouter2/RouterLocation";
import { buildRouterViews } from "@dabsi/typerouter2/view/buildRouterViews";
import {
  getRouterViewRenderers,
  RouterViewRendererWithDepth,
} from "@dabsi/typerouter2/view/getRouterViewRenderers";
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

  const { wrappers, history } = React.useMemo(() => {
    const wrappers: ((element, stack) => React.ReactElement)[] = [];

    const history = new RouterHistory(location => {
      setPath({ type: "index", location });
      p.setPath?.(location.path);
    }, path.location);

    let locationDepthCounter = 0;

    for (let location = path.location; location; location = location.parent!) {
      const locationDepth = locationDepthCounter++;

      const useParams = (callback: any) => {
        return React.useMemo(
          () => callback(...location.params),
          location.params
        );
      };

      const applyRenderers = (renderers: RouterViewRendererWithDepth[]) => {
        for (const { depth, renderer } of reversed(renderers)) {
          let rootLocation: RouterLocation = location;

          for (let index = 0; depth > index; index++)
            rootLocation = defined(
              rootLocation.parent,
              () => `Invalid depth ${depth}, ${index}`
            );

          wrappers.push((element, stack) => {
            stack = { ...stack };
            if (location.route?.propertyName) {
              stack[location.route.propertyName] = location.router;
            }

            return renderer({
              children: element,
              router: location.router,
              path,
              root: rootLocation.router,
              stack,
              history,
              useParams,
            });
          });
        }
      };

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
    }
    return { wrappers, history };
  }, [p.routerType, path]);

  let element: React.ReactElement = EmptyFragment;
  let stack = {};

  for (const wrapper of wrappers) {
    element = wrapper(element, stack);
  }
  return React.createElement(ReactContext.Provider, {
    deps: [path, history],
    entries: [
      [RouterLocation, path.location],
      [RouterHistory, history],
    ],
    children: element,
  });
}
