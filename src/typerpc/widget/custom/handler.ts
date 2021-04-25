import { AbstractWidgetHandler } from "@dabsi/old-typerpc/widget/AbstractWidgetHandler";
import {
  AnyCustomWidget,
  CustomWidget,
} from "@dabsi/old-typerpc/widget/custom/rpc";
import { IWidgetHandler } from "@dabsi/old-typerpc/widget/Widget";

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
