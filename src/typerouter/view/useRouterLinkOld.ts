import { AnyRouterLocation, RouterLocation } from "@dabsi/typerouter/location";
import Router, { AnyRouter, TRouter } from "@dabsi/typerouter/router";
import { useRoute } from "@dabsi/typerouter/view/context";
import { useEmitter } from "@dabsi/view/react/reactor/useEmitter";
import React from "react";
import { useState } from "react";
import { RouterViewEvent } from "../event";

export default function (getRouter: () => AnyRouter) {
  const [path, setPath] = useState(() => "#");
  const emit = useEmitter();
  const route = useRoute();

  return {
    path,
    push() {
      emit(RouterViewEvent, {
        type: "push",
        location: findLocation(),
      });
    },
    update() {
      if (path !== "#") {
        setPath(findLocation().path);
      }
    },
  };

  function findLocation() {
    return route.location.find(getRouter())!;
  }
}

export type RouterLinkTarget =
  | AnyRouterLocation
  | AnyRouter
  | ((location: AnyRouterLocation) => AnyRouterLocation | AnyRouter);

export function useRouterLink<T extends TRouter>(
  locationOrGetLocation: RouterLinkTarget
): {
  location: AnyRouterLocation | null;
  update(): void;
} {
  const route = useRoute();
  const [state, setState] = React.useState<null | AnyRouterLocation>(null);

  React.useEffect(() => {
    return () => {
      setState(null);
    };
  }, []);
  return {
    location: state,
    update() {
      const routerOrLocation =
        typeof locationOrGetLocation === "function"
          ? locationOrGetLocation(route.location)
          : locationOrGetLocation;

      setState(
        routerOrLocation instanceof RouterLocation
          ? routerOrLocation
          : route.location.find(routerOrLocation)!
      );
    },
  };
}
