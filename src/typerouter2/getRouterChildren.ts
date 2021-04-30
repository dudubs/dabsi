import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { getRouterRoutes, Route } from "@dabsi/typerouter2/Route";
import { Router, RouterType } from "@dabsi/typerouter2/Router";

export type RouterChildren = ReturnType<typeof getRouterChildren>;

export type RouterParamType<T = any> =
  | ((value: string) => T & { toString(): string })
  | {
      stringify(value: T): string;
      parse(value: string): T;
    };

export const getRouterChildren = WeakMapFactory((target: RouterType) => {
  const routeNameMap: Record<string, Route> = {};
  const propertyNameMap: Record<string, Route> = {};

  if (target !== Router) {
    const parent = getRouterChildren(Object.getPrototypeOf(target));
    ///
    Object.assign(routeNameMap, parent.routeNameMap);
    Object.assign(propertyNameMap, parent.propertyNameMap);
  }

  const routes = getRouterRoutes(target);

  for (const route of routes) {
    routeNameMap[route.name] = route;
    route.propertyName && (propertyNameMap[route.propertyName] = route);
  }

  return { routeNameMap, propertyNameMap };
});
