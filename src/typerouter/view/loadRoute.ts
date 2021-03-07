import { reversed } from "@dabsi/common/array/reversed";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Fn } from "@dabsi/common/typings2/Fn";
import { Store } from "@dabsi/store";
import { AnyRouterLocation } from "@dabsi/typerouter/location";
import { Route } from "@dabsi/typerouter/route";
import {
  getRouterViewMetadata,
  RouterViewMetadata,
} from "@dabsi/typerouter/view/metadata";
import { RouteViewComponent } from "@dabsi/typerouter/view/route";
import EmptyFragment from "@dabsi/view/react/utils/EmptyFragment";
import React from "react";

export async function loadRoute(
  route: Route,
  locationStore: Store<any>
): Promise<React.ReactElement | null> {
  const loaderPromiseMap = new Map<Fn, Promise<any>>();

  const metadata = getRouterViewMetadata(route.location.router);

  const wrappers: {
    getData: () => any;
    component: RouteViewComponent.Type<any, any>;
    location: AnyRouterLocation;
  }[] = [];

  let routeLocation: AnyRouterLocation;

  let routeHandler: RouteViewComponent.Handler<any, any> | null = null;

  let routeData: any = undefined;

  switch (route.type) {
    case "DEFAULT":
      loadByParent(metadata => metadata.defaultHandler);
      break;
    case "ERROR":
      loadByParent(metadata => metadata.errorHandler);
      break;
    case "INDEX":
      if (metadata.indexHandler) {
        loadByHandler(metadata.indexHandler, route.location);
      } else {
        loadByParent(metadata => metadata.defaultHandler);
      }
      break;
  }

  for (const location of route.location!.getParents()) {
    const metadata = getRouterViewMetadata(location.router);
    for (const { loader, component } of reversed(metadata.wrappers)) {
      let wrapperData;
      load(loader, location, data => {
        wrapperData = data;
      });
      wrappers.push({ getData: () => wrapperData, component, location });
    }
  }

  if (!routeHandler && !wrappers.length) {
    return null;
  }

  await Promise.all(loaderPromiseMap.values());

  let element: React.ReactElement = routeHandler
    ? React.createElement(routeHandler!.component, {
        route,
        location: routeLocation!,
        locationStore: locationStore.at(routeLocation!.path),
        data: routeData,
        children: null,
      })
    : EmptyFragment;

  for (const { component, getData, location } of wrappers) {
    element = React.createElement(component, {
      children: element,
      location,
      // TODO: Per wrapper?
      locationStore: locationStore.at(location.path),
      route,
      data: getData(),
    });
  }
  return element;

  function loadByHandler(
    handler: RouteViewComponent.Handler,
    location: AnyRouterLocation
  ) {
    load(handler.loader, location, data => {
      routeData = data;
    });
    routeHandler = handler;
    routeLocation = location;
  }

  function loadByParent(
    getHandler: (
      metadata: RouterViewMetadata
    ) => RouteViewComponent.Handler | undefined
  ) {
    for (const location of route.location.getParents()) {
      const metadata = getRouterViewMetadata(location.router);
      const handler = getHandler(metadata);
      if (handler) {
        return loadByHandler(handler, location);
      }
    }
  }

  function load(
    loader: undefined | ((params, location) => Awaitable),
    location: AnyRouterLocation,
    callback: (data) => void
  ) {
    if (!loader) return;
    const promise = loaderPromiseMap.touch(loader, async () =>
      loader(location.params, location)
    );

    promise.then(callback);
  }
}
