import { RouterLocation } from "@dabsi/typerouter2/RouterLocation";
import { Router } from "./Router";
import { Route } from "./Route";

export function getRouterProperty(router: Router, route: Route) {
  const createRouter = (params: any[]) =>
    new route.type(
      new RouterLocation(route.type, router.location, route, params)
    );

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
