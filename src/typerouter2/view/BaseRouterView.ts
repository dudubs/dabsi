import { WeakId } from "@dabsi/common/WeakId";
import { reversed } from "@dabsi/common/array/reversed";
import { defined } from "@dabsi/common/object/defined";
import { Router, RouterType } from "@dabsi/typerouter2/Router";
import { RouterLocation } from "@dabsi/typerouter2/RouterLocation";
import {
  getRouterViewRenderers,
  RouterViewRendererWithDepth,
} from "@dabsi/typerouter2/view/getRouterViewRenderers";
import {
  getRouterViewMetadata,
  RouterViewMatadata,
} from "@dabsi/typerouter2/view/RouterViewMetadata";
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
  const [locationPath, setLocationPath] = React.useState(() =>
    RouterLocation.parse(p.routerType, p.path)
  );

  const { component, history } = React.useMemo(() => {
    const wrappers: ((element, stack) => React.ReactElement)[] = [];

    const history = new RouterHistory(location => {
      setLocationPath({ type: "index", location });
      p.setPath?.(location.path);
    }, locationPath.location);

    let locationStepsCounter = 0;

    for (
      let location = locationPath.location;
      location;
      location = location.parent!
    ) {
      const locationSteps = locationStepsCounter++;

      const useParams = (callback: any) => {
        return React.useMemo(
          () => callback(...location.params),
          location.params
        );
      };

      const getLocationRoot = (location: RouterLocation, depth: number) => {
        for (let index = 0; depth > index; index++)
          location = defined(
            location.parent,
            () => `Invalid depth ${depth}, ${index}`
          );
        return location;
      };

      const applyRenderers = (renderers: RouterViewRendererWithDepth[]) => {
        for (const { depth, renderer } of reversed(renderers)) {
          const rootLocation: RouterLocation = getLocationRoot(location, depth);

          wrappers.push((element, stack) => {
            stack = { ...stack };
            if (location.route?.propertyName) {
              stack[location.route.propertyName] = location.router;
            }

            return renderer({
              children: element,
              router: location.router,
              path: locationPath,
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
        const metadata = getRouterViewMetadata.map.get(routerType);
        if (!metadata) continue;

        if (!locationSteps) {
          switch (locationPath.type) {
            case "index":
              metadata.indexRenderer &&
                applyRenderers([metadata.indexRenderer]);
              break;
            case "default":
              metadata.defaultRenderer &&
                applyRenderers([metadata.defaultRenderer]);
              break;
          }
        }

        applyRenderers(metadata.wrappers);
      }
    }
    return {
      history,
      component: () => {
        const stack = {};
        let element: React.ReactElement = EmptyFragment;
        for (const wrapper of wrappers) {
          element = wrapper(element, stack);
        }
        return element;
      },
    };
  }, [p.routerType, locationPath]);

  return React.createElement(ReactContext.Provider, {
    deps: [locationPath, history],
    entries: [
      [RouterLocation, locationPath.location],
      [RouterHistory, history],
    ],
    children: React.createElement(component),
  });
}
