import { Emittable } from "../react/reactor/Reactor";
import { RouterLocation } from "./RouterLocation";

export const RouterEvent = Emittable<{
  type: "push";
  location: RouterLocation<any>;
  redirection?: { type: "location"; location: RouterLocation<any> };
}>();
