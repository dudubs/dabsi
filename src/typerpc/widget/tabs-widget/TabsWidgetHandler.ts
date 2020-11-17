import { RequireOptionalKeys } from "../../../common/typings2/RequireOptionalKeys";
import { AbstractWidgetHandler } from "../AbstractWidgetHandler";
import { keys } from "../../../common/object/keys";
import { RpcUnresolvedConfig } from "../../Rpc";
import { IWidgetHandler, WidgetController, WidgetElement } from "../Widget";
import { AnyTabsWidget } from "./TabsWidget";

type T = AnyTabsWidget;

export class TabsWidgetHandler
  extends AbstractWidgetHandler<T>
  implements IWidgetHandler<T> {
  getControllerConfig(): RpcUnresolvedConfig<WidgetController<T>> {
    return undefined;
  }

  async handleGetTab(key) {
    return this.controller
      .then(c => c.getTargetHandler(key))
      .then(t => t.getElement());
  }

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    const [key] = keys(this.rpc.widget.controller.targetMap);

    const element =
      (key || undefined) &&
      (await this.controller
        .then(c => c.getTargetHandler(key))
        .then(c => c.getElement()));
    return { current: element ? { key, element } : undefined };
  }
}
