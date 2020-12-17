import { Emittable } from "@dabsi/react/reactor/Reactor";
import { RouterLocation } from "@dabsi/typerouter/RouterLocation";

export const RouterEvent = Emittable<{
  type: "push";
  location: RouterLocation<any>;
  redirection?: { type: "location"; location: RouterLocation<any> };
}>();
