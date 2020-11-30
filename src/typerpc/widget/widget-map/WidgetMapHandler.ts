import { mapObjectAsync } from "../../../common/object/mapObject";
import { AbstractWidgetHandler } from "../AbstractWidgetHandler";
import { IWidgetHandler, WidgetElement } from "../Widget";
import { mapHandlerChildrenAsync } from "./mapHandlerChildrenAsync";
import { AnyWidgetMap } from "./WidgetMap";

type T = AnyWidgetMap;

export class WidgetMapHandler
  extends AbstractWidgetHandler<T>
  implements IWidgetHandler<T> {
  $mapConfig = this.config;

  async getElement(state?): Promise<WidgetElement<T>> {
    return {
      elementMap: await mapHandlerChildrenAsync(this, (handler, key) =>
        handler.getElement(state?.[key])
      ),
    };
  }
}
