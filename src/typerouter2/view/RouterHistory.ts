import { getRouterLocation, Router } from "@dabsi/typerouter2/Router";
import { RouterLocation } from "@dabsi/typerouter2/RouterLocation";

export class RouterHistory {
  constructor(protected pusher: (location: RouterLocation) => void) {}

  push(router: Router) {
    this.pusher(getRouterLocation(router));
  }
}
