import { Awaitable, RequireOptionalKeys } from "../../common/typings";
import { RpcConfig } from "../Rpc";
import {
  WidgetConfig,
  WidgetController,
  WidgetElement,
  WidgetType,
} from "../widget/Widget";
import { AbstractInputContext } from "./AbstractInputContext";
import {
  AnyInput,
  InputCheckResult,
  InputData,
  InputType,
  InputValue,
} from "./Input";
import { OptionalInput } from "./OptionalInput";

export type T = OptionalInput<AnyInput>;

export class OptionalInputContext extends AbstractInputContext<T> {
  getControllerConfig(): RpcConfig<WidgetController<T>> {
    return this.config;
  }

  getDefaultValue(): Awaitable<InputValue<T> | undefined> {
    return this.controllerContext.getDefaultValue();
  }

  getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    return this.controllerContext.getElement();
  }

  protected getInputConfigForValue(
    value: InputType<T>["Value"]
  ): WidgetConfig<WidgetType<T>> {
    return undefined;
  }

  async loadAndCheck(data: InputData<T>): Promise<InputCheckResult<T>> {
    if (data != null) {
      return this.controllerContext.loadAndCheck(data);
    }
    return { value: null };
  }
}
