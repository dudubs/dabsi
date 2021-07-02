import { defined } from "@dabsi/common/object/defined";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { getRouterMetadata } from "@dabsi/typerouter/getRouterMetadata";
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
}

export interface RouterType<T extends Router = Router> {
  new (location: RouterLocation): T;
}
