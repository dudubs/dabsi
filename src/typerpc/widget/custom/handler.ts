import { AbstractWidgetHandler } from "@dabsi/typerpc/widget/AbstractWidgetHandler";
import {
  AnyCustomWidget,
  CustomWidget,
} from "@dabsi/typerpc/widget/custom/rpc";
import { IWidgetHandler } from "@dabsi/typerpc/widget/Widget";

type T = AnyCustomWidget;

export class CustomWidgetHandler
  extends AbstractWidgetHandler<T>
  implements IWidgetHandler<T> {
  //   $customConfig = this.config;

  $controllerConfig = this.config.controllerConfig;

  async getElement(state: {} | undefined): Promise<object> {
    return this.config.getElement();
  }
}
