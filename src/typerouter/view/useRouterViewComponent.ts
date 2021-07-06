import { reversed } from "@dabsi/common/array/reversed";
import defined from "@dabsi/common/object/defined";
import { Router } from "@dabsi/typerouter";
import { RouterType } from "@dabsi/typerouter/Router";
import {
  RouterLocation,
  RouterLocationPath,
} from "@dabsi/typerouter/RouterLocation";
import {
  AnyRouterViewRendererWithDepth,
  getRouterViewMetadata,
} from "@dabsi/typerouter/view/RouterViewMetadata";
import RouterViewNavigator from "@dabsi/typerouter/view/RouterViewNavigator";
import EmptyFragment from "@dabsi/view/react/EmptyFragment";
import React from "react";

export default function useRouterViewComponent(
  routerType: RouterType,
  locationPath: RouterLocationPath,
  navigator: RouterViewNavigator
): () => React.ReactElement {
  return React.useMemo(() => {
    const wrappers: ((element, stack) => React.ReactElement)[] = [];

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

      const applyRenderers = (renderers: AnyRouterViewRendererWithDepth[]) => {
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
              navigator,
              useParams,
              params: location.params,
            });
          });
        }
      };

      for (
        let routerType = location.routerType;
        routerType && routerType !== Router;
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
    return () => {
      const stack = {};
      let element: React.ReactElement = EmptyFragment;
      for (const wrapper of wrappers) {
        element = wrapper(element, stack);
      }
      return element;
    };
  }, [routerType, locationPath]);
}
