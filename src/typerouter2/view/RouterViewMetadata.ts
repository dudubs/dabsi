import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { Router, RouterChild, RouterType } from "@dabsi/typerouter2/Router";
import { RouterLocationPath } from "@dabsi/typerouter2/RouterLocation";
import RouterPathMap from "@dabsi/typerouter2/RouterPathMap";
import { RouterHistory } from "@dabsi/typerouter2/view/RouterHistory";
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
  history: RouterHistory;
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
