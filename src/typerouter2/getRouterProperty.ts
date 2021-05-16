import { RouterLocation } from "@dabsi/typerouter2/RouterLocation";
import { getRouterLocation, Router } from "./Router";
import { Route } from "./Route";

export function getRouterProperty(router: Router, route: Route) {
  const createRouter = (params: any[]) => {
    const location = getRouterLocation(router);
    return new route.type(
      new RouterLocation(route.type, location, route, params)
    );
  };

  if (!route.paramTypes.length) {
    return createRouter([]);
  }

  return (...params) => {
    if (params.length !== route.paramTypes.length) {
      throw new Error(
        `Expect to ${route.paramTypes.length} params, got ${params.length}.`
      );
    }
    return createRouter(params);
  };
}
