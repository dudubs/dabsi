import { Payload } from "@dabsi/common/typings2/Payload";
import { AnyRouterLocation, RouterLocation } from "@dabsi/typerouter/location";
import { AnyRouter } from "@dabsi/typerouter/router";
import { Emittable } from "@dabsi/view/react/reactor/Reactor";

export const RouterViewEvent = Emittable<
  Payload<{
    push: {
      location?: AnyRouterLocation;
      router?: AnyRouter;
      redirection?: { type: "location"; location: RouterLocation<any> };
    };
  }>
>();

export const RouterLocationEvent = Emittable<
  (location: AnyRouterLocation) => void
>();
