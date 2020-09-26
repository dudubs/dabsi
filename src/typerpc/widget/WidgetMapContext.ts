import { entries } from "../../common/object/entries";
import { RequireOptionalKeys } from "../../common/typings";
import { ContextualRpcContext, ContextualRpcType } from "../ContextualRpc";
import { AbstractWidgetContext } from "./AbstractWidgetContext";
import { RpcConfig, RpcError } from "../Rpc";
import { AnyWidget, WidgetController, WidgetElement } from "./Widget";
import { AnyWidgetMap, WidgetMap } from "./WidgetMap";

type T = WidgetMap<AnyWidgetMap>;
export class WidgetMapContext
  extends AbstractWidgetContext<T>
  implements ContextualRpcContext<WidgetMap<AnyWidgetMap>> {
  getControllerConfig(): RpcConfig<WidgetController<T>> {
    return this.config;
  }

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    const items: any = {};
    for (const [key, widget] of entries(this.controllerProps.items)) {
      items[key] = await widget.getContext(this.config[key]).getElement();
    }
    return { items };
  }
}
