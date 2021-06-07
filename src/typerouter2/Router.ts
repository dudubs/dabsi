import { defined } from "@dabsi/common/object/defined";
import { If } from "@dabsi/common/typings2/boolean";
import { IsNever } from "@dabsi/common/typings2/boolean/IsNever";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { Union } from "@dabsi/common/typings2/Union";
import { getRouterMetadata } from "@dabsi/typerouter2/getRouterMetadata";
import { Route } from "@dabsi/typerouter2/Route";
import { RouterLocation } from "./RouterLocation";

export type InferredRouterChildRouter<
  T extends RouterChild
> = InferredRouterChild<T>["Router"];

export type InferredRouterChildParams<
  T extends RouterChild
> = InferredRouterChild<T>["Params"];

export type RouterChild<T extends Router = Router, P extends any[] = []> =
  | RouteWithoutParams<T>
  | RouteWithParams<T, P>;

export type InferredRouterChild<
  T extends RouterChild
> = T extends RouteWithParams<infer Router, infer Params>
  ? { Router: Router; Params: Params }
  : T extends RouteWithoutParams<infer Router>
  ? { Router: Router; Params: [] }
  : never;

// getRouterLocation
export type RouteWithoutParams<T extends Router = Router> = T;

export type RouteWithParams<
  T extends Router = Router,
  U extends any[] = any[]
> = (...args: U) => T;

export type RouterChildKey<T extends Router> = ExtractKeys<
  T,
  RouteWithoutParams | RouteWithParams
>;

const routerLocationMap = new WeakMap();

export function getRouterLocation(router: Router): RouterLocation {
  return defined(routerLocationMap.get(router), () => `No router location`);
}

export class Router {
  constructor(location: RouterLocation) {
    routerLocationMap.set(this, location);
  }

  static at: RouterType["at"] = function (path): any {
    let routerType: RouterType<any> = this;
    for (const pathKey of typeof path === "string" ? path.split(".") : path) {
      routerType = defined(
        getRouterMetadata(routerType).routePropertyMap[pathKey].type,
        () => `No route like "${routerType.name}.${path}".`
      );
    }
    return routerType;
  };
}

export type RouterType<T extends Router = Router> = {
  new (location: RouterLocation): T;

  at<T extends Router, K extends string>(
    this: RouterType<T>,
    path: K | string[]
  ): RouterAt<T, K> extends RouterChild<infer T> ? RouterType<T> : never;
};

export type RouterAt<T, P extends string> = T extends Record<
  P,
  RouterChild<infer T>
>
  ? T
  : P extends `${infer K}.${infer P}`
  ? RouterAt<RouterAt<T, K>, P>
  : never;

export type RouterInvalidPath<T, P extends string> = Union<
  {
    [K in P]: If<IsNever<RouterAt<T, K>>, K>;
  }
>;

export type RouterValidatePath<
  T,
  P extends string,
  U,
  InvalidPath = RouterInvalidPath<T, P>
> = IsNever<InvalidPath> extends true ? U : { InvalidPath: InvalidPath };

export type RouterStackAt<T, P extends string> = T extends Record<
  P,
  RouterChild<infer T>
>
  ? Record<P, T>
  : P extends `${infer K}.${infer P}`
  ? RouterStackAt<T, K> & RouterStackAt<T, P>
  : {};
