import { RouterHistory } from "@dabsi/typerouter2/view/RouterHistory";
import { ReactContext } from "@dabsi/view/react/ReactContext";

export class SystemViewContext extends ReactContext {
  get history(): RouterHistory {
    return this.require(RouterHistory);
  }
}
