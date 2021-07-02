import { Router } from "@dabsi/typerouter";
import { getRouterLocation, RouterType } from "@dabsi/typerouter/Router";
import { RouterLocation } from "@dabsi/typerouter/RouterLocation";
import RouterViewNavigator from "@dabsi/typerouter/view/RouterViewNavigator";
import ViewContext from "@dabsi/view/react/ViewContext";
import React from "react";

export type RouterLinkProps<T extends Router> = {
  to: T | RouterType<T> | [T | RouterType<T>, ((router: T) => Router)?];
  children: (props: { push(); readonly path: string }) => React.ReactElement;
};

export default function RouterLink<T extends Router>(p: RouterLinkProps<T>) {
  const c = ViewContext.use({
    history: RouterViewNavigator,
    location: RouterLocation,
  });

  const getRouter = useLazy(() => {
    if (Array.isArray(p.to)) {
      let [router, locate] = p.to as [any, any];
      if (typeof router === "function") {
        router = c.location!.find(router as RouterType);
      }
      if (locate) {
        router = locate(router);
      }
      return router;
    }
    return typeof p.to === "function"
      ? c.location!.find(p.to as RouterType)
      : p.to;
  });

  return p.children({
    push() {
      c.history!.push(getRouter());
    },
    get path() {
      return getRouterLocation(getRouter()).path;
    },
  });
}

function useLazy(callback) {
  const [state, setState] = React.useState(undefined);

  return () => {
    if (state !== undefined) return state;
    const value = callback();
    setState(value);
    return value;
  };
}
