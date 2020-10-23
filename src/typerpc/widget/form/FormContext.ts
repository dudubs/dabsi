import { RequireOptionalKeys } from "../../../common/typings";
import { RpcConfigOld } from "../../old/Old";
import { AbstractWidgetContext } from "../../old/AbstractWidgetContext";
import { AnyForm } from "./Form";
import { WidgetController, WidgetElement } from "../Widget";

type T = AnyForm;

export class FormContext extends AbstractWidgetContext<T> {
  getControllerConfig(): RpcConfigOld<WidgetController<T>> {
    return this.config.inputConfig;
  }

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    return this.controllerContext.call("getElement");
  }
}
