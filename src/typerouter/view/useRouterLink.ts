import { AnyRouterLocation, RouterLocation } from "@dabsi/typerouter/location";
import { AnyRouter } from "@dabsi/typerouter/router";
import { useRoute } from "@dabsi/typerouter/view/context";
import React from "react";

export type RouterLinkTarget =
  | AnyRouterLocation
  | AnyRouter
  | ((location: AnyRouterLocation) => AnyRouterLocation | AnyRouter);

export function useRouterLink(
  locationOrGetLocation: RouterLinkTarget
): {
  location: AnyRouterLocation | null;
  update(): void;
} {
  const route = useRoute();
  const [location, setLocation] = React.useState<null | AnyRouterLocation>(
    () => {
      const routerOrLocation =
        typeof locationOrGetLocation === "function"
          ? locationOrGetLocation(route.location)
          : locationOrGetLocation;

      const location =
        routerOrLocation instanceof RouterLocation
          ? routerOrLocation
          : route.location.find(routerOrLocation);
      return location!;
    }
  );

  React.useEffect(() => {
    return () => {
      setLocation(null);
    };
  }, []);
  return {
    location,
    update() {
      const routerOrLocation =
        typeof locationOrGetLocation === "function"
          ? locationOrGetLocation(route.location)
          : locationOrGetLocation;

      const location =
        routerOrLocation instanceof RouterLocation
          ? routerOrLocation
          : route.location.find(routerOrLocation);

      if (!location) {
        throw new Error("Location not found.");
      }
      setLocation(location);
    },
  };
}
