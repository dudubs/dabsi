import { WeakMapFactory } from "../common/map/mapFactory";
import { defined } from "../common/object/defined";
import { mapObject } from "../common/object/mapObject";
import { assignAllDescriptors } from "../common/object/assignAllDescriptors";
import { AnyRouter, Router } from "./Router";

declare module "./Router" {
  interface Router {
    at: typeof routerAt;

    parent?: AnyRouter;
    childrenOwner?: AnyRouter;
  }
}

export type RouterAt<
  Router extends AnyRouter,
  K extends keyof Router["children"]
> = Router["children"][K] &
  Router["routerType"] &
  Pick<
    Router,
    "routerType" | "routeType" | "stackType" | "instanceType" | "locationType"
  > & {
    stackType: Record<
      K,
      Router["children"][K] &
        Pick<
          Router,
          "routeType" | "routerType" | "locationType" | "instanceType"
        >
    >;
  };

export const getRouterChildren = WeakMapFactory((owner: AnyRouter) =>
  mapObject(
    owner.children,
    (router: AnyRouter): AnyRouter => {
      const routerType = assignAllDescriptors(
        router.routerType,
        owner.routerType
      );

      return Object.setPrototypeOf(
        {
          ...router,
          routerType,
          locationType: assignAllDescriptors(
            router.locationType,
            owner.locationType
          ),
          routeType: assignAllDescriptors(router.routeType, owner.routeType),
        },
        routerType
      );
    }
  )
);

export function routerAt<
  //
  Router extends AnyRouter,
  K extends keyof Router["children"]
  //
>(this: Router, key: string & K): RouterAt<Router, K> {
  return <any>anyRouterAt(this, key);
}

export function anyRouterAt(router: AnyRouter, key: string): AnyRouter {
  return <any>(
    defined(getRouterChildren(router)[key], () => `No router child ${key}`)
  );
}
