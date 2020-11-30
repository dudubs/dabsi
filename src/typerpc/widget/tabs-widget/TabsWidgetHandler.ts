import { keys } from "../../../common/object/keys";
import { IRpcHandler, RpcError } from "../../Rpc";
import { AbstractWidgetHandler } from "../AbstractWidgetHandler";
import { AnyWidget, WidgetElement, WidgetElementState } from "../Widget";
import { AnyTabsWidget } from "./TabsWidget";

type T = AnyTabsWidget;

export class TabsWidgetHandler
  extends AbstractWidgetHandler<T>
  implements IRpcHandler<T> {
  $mapConfig = this.config;

  $getTabElementCommand = async (
    key: string
  ): Promise<WidgetElement<AnyWidget>> => {
    const c = await this.getChildHandler("map");
    const t = await c.getChildHandler(key);
    return await t.getElement(undefined);
  };

  async getElement(
    state: WidgetElementState<T> | undefined
  ): Promise<WidgetElement<T>> {
    let key = state?.currentTab?.key;
    if (!key || !(key in this.rpc.children.map.children)) {
      [key] = keys(this.rpc.children.map.children);
    }
    if (!key) throw new RpcError(`No tab key`);
    const element = await this.getChildHandler("map")
      .then(c => c.getChildHandler(key!))
      .then(c => c.getElement(state?.currentTab?.state));
    return { current: element ? { key, element } : undefined };
  }
}
