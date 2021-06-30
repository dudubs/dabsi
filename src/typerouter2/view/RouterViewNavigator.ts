import { defined } from "@dabsi/common/object/defined";
import {
  getRouterLocation,
  Router,
  RouterType,
} from "@dabsi/typerouter2/Router";
import { RouterLocation } from "@dabsi/typerouter2/RouterLocation";

export default class RouterViewNavigator {
  constructor(
    protected pushLocation: (location: RouterLocation) => void,
    readonly getCurrentLocation: () => RouterLocation
  ) {}

  get location() {
    return this.getCurrentLocation();
  }

  push<T extends Router>(
    routerType: RouterType<T>,
    getRouter?: (router: T) => Router
  );
  push(location: RouterLocation);
  push(location: Router);
  push(arg0, getRouter?) {
    let location: RouterLocation;
    if (typeof arg0 === "function") {
      let router = defined(
        this.location.find(arg0),
        () => `No static route to ${arg0.name}`
      );

      if (getRouter) {
        router = getRouter(router);
      }
      location = getRouterLocation(router);
    } else if (arg0 instanceof RouterLocation) {
      location = arg0;
    } else {
      location = getRouterLocation(arg0);
    }
    this.pushLocation(location);
  }
}

declare module "../Router" {
  namespace Router {
    function locate(): RouterViewNavigatorLocator;
    function locate<T extends Router>(
      this: RouterType<T>,
      callback: (router: T) => Router
    ): RouterViewNavigatorLocator;
  }
}

export type RouterViewNavigatorLocator = {
  (navigator: RouterViewNavigator): void;
  (event: any, props: { navigator: RouterViewNavigator }): void;
};

Router.locate = function (callback?): any {
  return (arg0, arg1?) => {
    const navigator: RouterViewNavigator = arg1?.navigator || arg0;
    navigator.push(this, callback);
  };
};
