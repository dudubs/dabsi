import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { Router, RouterChild, RouterType } from "@dabsi/typerouter/Router";
import { RouterLocationPath } from "@dabsi/typerouter/RouterLocation";
import RouterViewNavigator from "@dabsi/typerouter/view/RouterViewNavigator";
import { Renderer } from "@dabsi/view/react/renderer";
import React from "react";

export type BaseRouterViewRendererProps<
  T extends Router,
  R extends Router,
  P extends any[],
  S,
  E
> = {
  root: R;
  navigator: RouterViewNavigator;
  router: T;
  stack: S;
  path: RouterLocationPath;
  params: P;
  useParams: <T>(callback: (...params: P) => T) => T;
  children: React.ReactElement;
} & E;

export const getRouterViewMetadata = WeakMapFactory(
  (routerType: RouterType) => new RouterViewMatadata()
);

export type RouterViewRendererProps<
  T,
  R extends Router,
  S,
  E = {}
> = T extends RouterChild<infer T, infer P>
  ? BaseRouterViewRendererProps<T, R, P, S, E>
  : never;

export type RouterViewRenderer<T, R extends Router, S, E = {}> = Renderer<
  RouterViewRendererProps<T, R, S>
>;

export type AnyRouterViewRendererWithDepth = {
  renderer: RouterViewRenderer<any, any, any>;
  depth: number;
};

export class RouterViewMatadata {
  wrappers: AnyRouterViewRendererWithDepth[] = [];

  indexRenderer?: AnyRouterViewRendererWithDepth = undefined;

  defaultRenderer?: AnyRouterViewRendererWithDepth = undefined;

  errorRenderer?: AnyRouterViewRendererWithDepth = undefined;
}
