import { defined } from "@dabsi/common/object/defined";
import {
  getRouterLocation,
  Router,
  RouterType,
} from "@dabsi/typerouter2/Router";
import { RouterLocation } from "@dabsi/typerouter2/RouterLocation";

export class RouterHistory {
  constructor(
    protected pusher: (location: RouterLocation) => void,
    protected location: RouterLocation
  ) {}

  push<T extends Router>(
    routerType: RouterType<T>,
    getRouter?: (router: T) => Router
  );
  push(location: RouterLocation);
  push(location: Router);
  push(arg0, getRouter?) {
    let location: RouterLocation;

    if (typeof arg0 === "function") {
      location = defined(
        this.location.find(arg0),
        () => `No static route to ${arg0.name}`
      );

      if (getRouter) {
        location = getRouterLocation(getRouter(location));
      }
    } else if (arg0 instanceof RouterLocation) {
      location = arg0;
    } else {
      location = getRouterLocation(arg0);
    }
    this.pusher(location);
  }
}
