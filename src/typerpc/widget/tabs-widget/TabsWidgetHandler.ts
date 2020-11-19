import { RequireOptionalKeys } from "../../../common/typings2/RequireOptionalKeys";
import { AbstractWidgetHandler } from "../AbstractWidgetHandler";
import { keys } from "../../../common/object/keys";
import { RpcError, RpcUnresolvedConfig } from "../../Rpc";
import {
  IWidgetHandler,
  WidgetController,
  WidgetElement,
  WidgetElementState,
} from "../Widget";
import { AnyTabsWidget } from "./TabsWidget";

type T = AnyTabsWidget;

export class TabsWidgetHandler
  extends AbstractWidgetHandler<T>
  implements IWidgetHandler<T> {
  getControllerConfig(): RpcUnresolvedConfig<WidgetController<T>> {
    return this.config;
  }

  async handleGetTabElement(key) {
    return this.controller
      .then(c => c.getTargetHandler(key))
      .then(t => t.getElement(undefined));
  }

  async getElement(
    state: WidgetElementState<T> | undefined
  ): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    let key = state?.currentTab?.key;
    if (!key || !(key in this.rpc.tabMap)) {
      [key] = keys(this.rpc.tabMap);
    }
    if (!key) throw new RpcError(`No tab key`);
    const element = await this.controller
      .then(c => c.getTargetHandler(key!))
      .then(c => c.getElement(state?.currentTab?.state));
    return { current: element ? { key, element } : undefined };
  }
}
