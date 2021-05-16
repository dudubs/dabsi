import { defined } from "@dabsi/common/object/defined";
import { Router } from "@dabsi/typerouter2";
import { RouterType } from "@dabsi/typerouter2/Router";
import { RouterLocation } from "@dabsi/typerouter2/RouterLocation";
import { RouterHistory } from "@dabsi/typerouter2/view/RouterHistory";
import { ReactContext } from "@dabsi/view/react/ReactContext";

export class SystemViewContext extends ReactContext {
  get location(): RouterLocation {
    return this.require(RouterLocation);
  }

  get history(): RouterHistory {
    return this.require(RouterHistory);
  }

  get push(): <T extends Router>(
    routerType: RouterType<T>,
    callback?: (router: T) => void
  ) => void {
    return (routerType, callback?) => {
      let router: Router = defined(
        this.location.find(routerType),
        () => `No static route for "${routerType.name}".`
      );
      if (callback) {
        router = <any>callback(<any>router);
      }
      this.history.push(router);
    };
  }
}
