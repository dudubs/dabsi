import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { AnyRouter } from "@dabsi/typerouter/router";
import { RouteViewComponent } from "@dabsi/typerouter/view/route";

export type RouterViewMetadata = {
  wrappers: RouteViewComponent.Handler[];

  indexHandler?: RouteViewComponent.Handler;

  errorHandler?: RouteViewComponent.Handler;

  defaultHandler?: RouteViewComponent.Handler;
};

export const getRouterViewMetadata = WeakMapFactory(
  (router: AnyRouter): RouterViewMetadata => {
    return {
      wrappers: [],
    };
  }
);
