import { ExcludeKeys } from "@dabsi/common/typings2/ExcludeKeys";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { ReactChild } from "react";
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

export class Router {
  constructor(readonly location: RouterLocation) {}
}

export type RouterType<T extends Router = Router> = {
  new (location: RouterLocation): T;
};
