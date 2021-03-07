import { keys } from "@dabsi/common/object/keys";
import { IRpcHandler } from "@dabsi/typerpc/Rpc";
import { RpcError } from "@dabsi/typerpc/RpcError";
import { AbstractWidgetHandler } from "@dabsi/typerpc/widget/AbstractWidgetHandler";
import {
  AnyWidget,
  WidgetElement,
  WidgetElementState,
} from "@dabsi/typerpc/widget/Widget";
import { AnyTabsWidget } from "@dabsi/typerpc/widget/tabs/rpc";

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
