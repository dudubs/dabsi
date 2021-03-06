import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import defined from "@dabsi/common/object/defined";
import { SingleCall } from "@dabsi/common/patterns/SingleCall";
import { Reflector } from "@dabsi/common/reflection/Reflector";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { RouterParamType } from "@dabsi/typerouter/getRouterMetadata";
import { getRouterProperty } from "./getRouterProperty";
import {
  Router,
  RouterType,
  RouteWithoutParams,
  RouteWithParams,
} from "./Router";

declare module "./Router" {
  namespace Router {
    function Route(routeName: string): (target: RouterType) => void;
    function Route<T extends Router, K extends ExtractKeys<T, RouteWithParams>>(
      this: RouterType<T>,
      routeName: string,
      propertyName: K
    ): (target: RouterType<T[K]>) => void;
  }
}
export type Route = {
  readonly type: RouterType;
  // rename to target
  routerType: RouterType;
  propertyName?: string;
  name: string;
  paramTypes: RouterParamType[];
};

export type RouteWithoutParamsDecorator<T extends Router> = <K extends string>(
  target: Record<K, RouteWithoutParams<T>>,
  propertyName: K
) => void;

export type RouteWithParamsDecorator<T extends Router, P extends any[]> = <
  K extends string
>(
  target: Record<K, RouteWithParams<T, P>>,
  propertyName: K
) => void;

export const getRouterRoutes = WeakMapFactory(
  (routerType: RouterType): Route[] => []
);

export function Route<T extends Router>(
  getRouteType?: () => RouterType<T>
): RouteWithoutParamsDecorator<T>;

export function Route<T extends Router>(
  routeName: string,
  getRouteType?: () => RouterType<T>
): RouteWithoutParamsDecorator<T>;

export function Route<
  T extends Router,
  P0 = string,
  P1 = undefined,
  P2 = undefined,
  P3 = undefined,
  P4 = undefined,
  P5 = undefined,
  P6 = undefined,
  P7 = undefined,
  P8 = undefined,
  P9 = undefined
>(
  routeName: string,
  getRouteType: () => RouterType<T>,
  paramTypes: [
    RouterParamType<P0>,
    RouterParamType<P1>?,
    RouterParamType<P2>?,
    RouterParamType<P3>?,
    RouterParamType<P4>?,
    RouterParamType<P5>?,
    RouterParamType<P6>?,
    RouterParamType<P7>?,
    RouterParamType<P8>?,
    RouterParamType<P9>?
  ]
): RouteWithParamsDecorator<T, [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9]>;

export function Route<
  T extends Router,
  P0 = undefined,
  P1 = undefined,
  P2 = undefined,
  P3 = undefined,
  P4 = undefined,
  P5 = undefined,
  P6 = undefined,
  P7 = undefined,
  P8 = undefined,
  P9 = undefined
>(
  getRouteType: () => RouterType<T>,
  paramTypes: [
    RouterParamType<P0>,
    RouterParamType<P1>?,
    RouterParamType<P2>?,
    RouterParamType<P3>?,
    RouterParamType<P4>?,
    RouterParamType<P5>?,
    RouterParamType<P6>?,
    RouterParamType<P7>?,
    RouterParamType<P8>?,
    RouterParamType<P9>?
  ]
): RouteWithParamsDecorator<T, [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9]>;

export function Route(...args) {
  return (target, propertyName) => {
    const routerType: RouterType = target.constructor;
    let routeName = propertyName;

    if (typeof args[0] === "string") {
      [routeName, ...args] = args;
    }

    const [
      getRouteType = () =>
        defined(
          Reflector.getPropertyType(target.constructor, propertyName),
          () => `No routeType for "${target.constructor.name}.${propertyName}"`
        ),
      paramTypes = [],
    ] = args;

    const bindRouterType = SingleCall(() => {
      const routeType = getRouteType();

      return <RouterType>(<any>class extends routeType {
        static route = route;
        // @ts-ignore
        static get name() {
          return `<BoundRouter ${routerType.name}.${propertyName}: ${routeType.name}>`;
        }
      });
    });

    const route: Route = {
      routerType,
      propertyName,
      name: routeName,
      get type() {
        return bindRouterType();
      },
      paramTypes,
    };

    getRouterRoutes(routerType).push(route);

    Object.defineProperty(target, propertyName, {
      get(this: Router) {
        return getRouterProperty(this, route);
      },
    });
  };
}

Router.Route = function (routeName, propertyName?) {
  const routerType: RouterType = this;

  return routeType => {
    if (propertyName) {
      Route(() => routeType, routeName)(routerType.prototype, propertyName);
      return;
    }

    getRouterRoutes(routerType).push({
      type: routeType,
      routerType,
      name: routeName,
      paramTypes: [],
    });
  };
};
