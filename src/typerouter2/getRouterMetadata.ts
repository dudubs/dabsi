import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { pushOrAssign } from "@dabsi/common/object/pushOrAssign";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { getRouterRoutes, Route } from "@dabsi/typerouter2/Route";
import { Router, RouterType } from "@dabsi/typerouter2/Router";

export type RouterChildren = ReturnType<typeof getRouterMetadata>;

export type RouterParamType<T = any> =
  | ((value: string) => T & { toString(): string })
  | {
      stringify(value: T): string;
      parse(value: string): T;
    };

export const getRouterMetadata = WeakMapFactory((target: RouterType) => {
  const m = {
    routeMap: {} as Record<string, Route>,
    routePropertyMap: {} as Record<string, Route>,
    dynamicRoutes: [] as Route[],
    staticRoutes: [] as Route[],
  };

  if (target !== Router) {
    const parent = getRouterMetadata(Object.getPrototypeOf(target));
    pushOrAssign(m, "routeMap", parent);
    pushOrAssign(m, "routePropertyMap", parent);
    pushOrAssign(m, "dynamicRoutes", parent);
    pushOrAssign(m, "staticRoutes", parent);
  }

  const routes = getRouterRoutes(target);

  Object.seal(routes);

  for (const route of routes) {
    m.routeMap[route.name] = route;
    route.propertyName && (m.routePropertyMap[route.propertyName] = route);

    (route.paramTypes.length ? m.dynamicRoutes : m.staticRoutes).push(route);
  }

  return m;
});
