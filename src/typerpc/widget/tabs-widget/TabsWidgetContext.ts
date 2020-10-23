import { firstEntry } from "../../../common/object/firstEntry";
import { RequireOptionalKeys } from "../../../common/typings";
import { RpcConfigOld } from "../../old/Old";
import { RpcError } from "../../Rpc";
import { AbstractWidgetContext } from "../../old/AbstractWidgetContext";
import { TabsWidget } from "./TabsWidget";
import { AnyWidget, WidgetController, WidgetElement } from "../Widget";

type T = TabsWidget<AnyWidgetRecord>;

export class TabsWidgetContext extends AbstractWidgetContext<T> {
  getControllerConfig(): RpcConfigOld<WidgetController<T>> {
    return this.config;
  }

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    const [key, widget] = firstEntry(this.controllerProps.items);
    return {
      current: !(key && widget)
        ? undefined
        : {
            key,
            element: await widget
              .getContext(this.config[key])
              .then(context => context.getElement()),
          },
    };
  }
}
