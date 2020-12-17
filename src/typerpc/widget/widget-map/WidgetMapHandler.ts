import { mapObjectAsync } from "@dabsi/common/object/mapObject";
import { AbstractWidgetHandler } from "@dabsi/typerpc/widget/AbstractWidgetHandler";
import { IWidgetHandler, WidgetElement } from "@dabsi/typerpc/widget/Widget";
import { mapChildrenHandlerAsync } from "@dabsi/typerpc/widget/widget-map/mapChildrenHandlerAsync";
import { AnyWidgetMap } from "@dabsi/typerpc/widget/widget-map/WidgetMap";

type T = AnyWidgetMap;

export class WidgetMapHandler
  extends AbstractWidgetHandler<T>
  implements IWidgetHandler<T> {
  $mapConfig = this.config;

  async getElement(state?): Promise<WidgetElement<T>> {
    return {
      elementMap: await mapChildrenHandlerAsync(this, (handler, key) =>
        handler.getElement(state?.[key])
      ),
    };
  }
}
