import { Awaitable, RequireOptionalKeys } from "../../common/typings";
import { RpcConfigOld } from "../old/Old";
import {
  WidgetConfig,
  WidgetController,
  WidgetElement,
  WidgetType,
} from "../widget/Widget";
import { AbstractInputContext } from "./AbstractInputContext";
import {
  AnyInput,
  InputCheckResultType,
  InputData,
  InputType,
  InputValue,
} from "./Input";
import { OptionalInput } from "./OptionalInput";

export type T = OptionalInput<AnyInput>;

export class OptionalInputContext extends AbstractInputContext<T> {
  getControllerConfig(): RpcConfigOld<WidgetController<T>> {
    return this.config;
  }

  getDefaultValue(): Awaitable<InputValue<T> | undefined> {
    return this.controllerContext.call("getDefaultValue");
  }

  getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    return this.controllerContext.call("getElement");
  }

  protected getInputConfigForValue(
    value: InputType<T>["Value"]
  ): WidgetConfig<WidgetType<T>> {
    return undefined;
  }

  async loadAndCheck(data: InputData<T>): Promise<InputCheckResultType<T>> {
    if (data != null) {
      return this.controllerContext.call("loadAndCheck", data);
    }
    return { value: null };
  }
}
