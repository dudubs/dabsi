import { Awaitable } from "../../../common/typings2/Async";
import { AbstractWidgetHandler } from "../AbstractWidgetHandler";
import { mapObjectAsync } from "../../../common/object/mapObject";
import { AnyRpc, IRpcHandler, RpcUnresolvedConfig } from "../../Rpc";
import { WidgetElement } from "../Widget";
import { AnyWidgetMap } from "./WidgetMap";

type T = AnyWidgetMap;

export class WidgetMapHandler
  extends AbstractWidgetHandler<T>
  implements IRpcHandler<T> {
  $mapConfig = this.config;

  getChildConfig(key: string): Awaitable<RpcUnresolvedConfig<AnyRpc>> {
    return this.config[key];
  }

  async getElement(state?): Promise<WidgetElement<T>> {
    return {
      elementMap: await mapObjectAsync(this.rpc.children, (target, key) =>
        this.getChildHandler("map")
          .then(c => c.getChildHandler(key))
          .then(h => h.getElement(state?.[key]))
      ),
    };
  }
}
