import { AbstractWidgetHandler } from "@dabsi/old-typerpc/widget/AbstractWidgetHandler";
import {
  IWidgetHandler,
  WidgetElement,
  WidgetElementState,
} from "@dabsi/old-typerpc/widget/Widget";
import { AnyWidgetMap } from "@dabsi/old-typerpc/widget/widget-map/rpc";

type T = AnyWidgetMap;

export class WidgetMapHandler
  extends AbstractWidgetHandler<T>
  implements IWidgetHandler<T> {
  $mapConfig = this.config;

  async getElement(state?: WidgetElementState<T>): Promise<WidgetElement<T>> {
    const pickedChildKeys =
      state?.get || Object.keys(this.rpc.children.map.children);
    const elementMap = {};
    const stateMap = state?.stateMap || {};
    const mapHandler = await this.getChildHandler("map");
    for (const childKey of pickedChildKeys) {
      const childHandler = await mapHandler.getChildHandler(childKey);
      elementMap[childKey] = await childHandler.getElement(stateMap[childKey]);
    }
    return {
      elementMap,
    };
  }
}
