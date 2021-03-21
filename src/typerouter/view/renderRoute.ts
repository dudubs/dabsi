import { reversed } from "@dabsi/common/array/reversed";
import { Store } from "@dabsi/store";
import { AnyRouterLocation } from "@dabsi/typerouter/location";
import { Route } from "@dabsi/typerouter/route";
import {
  getRouterViewMetadata,
  RouterViewMetadata,
} from "@dabsi/typerouter/view/metadata";
import { RouteViewComponent } from "@dabsi/typerouter/view/route";
import React from "react";

export function renderRoute(
  route: Route,
  store: Store<any>,
  defaultElement: React.ReactElement
): React.ReactElement {
  const data = {};
  const metadata = getRouterViewMetadata(route.location.router);

  switch (route.type) {
    case "DEFAULT":
      return renderByParent(metadata => metadata.defaultHandler);
    case "ERROR":
      return renderByParent(metadata => metadata.errorHandler);
    case "INDEX":
      if (metadata.indexHandler) {
        return renderByHandler(metadata.indexHandler, route.location);
      } else {
        return renderByParent(metadata => metadata.defaultHandler);
      }
  }

  function renderByHandler(
    handler: RouteViewComponent.Handler,
    location: AnyRouterLocation
  ): React.ReactElement {
    let element = React.createElement(handler.component, {
      route,
      location,
      locationStore: store.at(location.path),

      children: null,
      useParams: makeUseParamsFn(location),
    });

    for (const wrppaerLocation of location.getParents()) {
      const metadata = getRouterViewMetadata(wrppaerLocation.router);
      for (const wrapper of reversed(metadata.wrappers)) {
        element = React.createElement(wrapper.component, {
          route,
          location: wrppaerLocation,
          locationStore: store.at(wrppaerLocation.path),
          children: element,
          useParams: makeUseParamsFn(wrppaerLocation),
        });
      }
    }

    return element;
  }

  function renderByParent(
    getHandler: (
      metadata: RouterViewMetadata
    ) => RouteViewComponent.Handler | undefined
  ): React.ReactElement {
    for (const location of route.location.getParents()) {
      const metadata = getRouterViewMetadata(location.router);
      const handler = getHandler(metadata);
      if (handler) {
        return renderByHandler(handler, location);
      }
    }
    return defaultElement;
  }
}

const makeUseParamsFn = (location: AnyRouterLocation) => (
  callback,
  deps = []
) => {
  return React.useMemo(() => callback(location.params), [
    ...location.router.params.map(p => location.params[p]),
    ...deps,
  ]);
};
