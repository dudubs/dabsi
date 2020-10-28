import { AbstractWidgetHandler } from "../AbstractWidgetHandler";
import { mapObjectAsync } from "../../../common/object/mapObject";
import { RpcUnresolvedConfig } from "../../Rpc";
import { WidgetController, WidgetElement } from "../Widget";
import { AnyWidgetMap } from "./WidgetMap";

type T = AnyWidgetMap;

export class WidgetMapHandler extends AbstractWidgetHandler<T> {
  getControllerConfig(): RpcUnresolvedConfig<WidgetController<T>> {
    return this.config;
  }

  async getElement(): Promise<WidgetElement<T>> {
    return {
      elementMap: await mapObjectAsync(this.rpc.targetMap, (target, key) =>
        this.controller
          .then(c => c.getTargetHandler(key))
          .then(h => h.getElement())
      ),
    };
  }
}
