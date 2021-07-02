import RouterViewNavigator from "@dabsi/typerouter/view/RouterViewNavigator";
import { ViewContext, ViewContextMap } from "@dabsi/view/react/ViewContext";

export default class SystemViewContext {
  constructor(readonly map: ViewContextMap) {}

  get navigator(): RouterViewNavigator {
    return ViewContext.get(this.map, RouterViewNavigator);
  }
}
