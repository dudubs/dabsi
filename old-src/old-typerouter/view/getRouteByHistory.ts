import { History } from "history";
import { getRouteByPath } from "@dabsi/typerouter/route";
import { AnyRouter } from "@dabsi/typerouter/router";
import { RouterLocation } from "@dabsi/typerouter/location";
import { Emitter } from "@dabsi/view/react/reactor/useEmitter";

export function getRouteByHistory(
  history: History,
  router: AnyRouter,
  emitter: Emitter
) {
  return getRouteByPath(
    RouterLocation.create(router, emitter),
    history.location.pathname
  );
}
