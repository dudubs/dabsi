import { Awaitable, RequireOptionalKeys } from "../../common/typings";
import { RpcConfig } from "../Rpc";
import {
  WidgetConfig,
  WidgetController,
  WidgetElement,
  WidgetType,
} from "../widget/Widget";
import { AbstractInputContext } from "./AbstractInputContext";
import { InputCheckResult, InputData, InputType, InputValue } from "./Input";
import { NumberInput } from "./NumberInput";
import { loadAndCheckNumber } from "./NumberSchema";

type T = NumberInput;

export class NumberInputContext extends AbstractInputContext<T> {
  protected getInputConfigForValue(
    value: InputType<T>["Value"]
  ): WidgetConfig<WidgetType<T>> {
    return { ...this.config, default: value };
  }

  getDefaultValue(): Awaitable<InputValue<T> | undefined> {
    return this.config.default;
  }

  getControllerConfig(): RpcConfig<WidgetController<T>> {
    return null;
  }

  async loadAndCheck(
    value: NonNullable<InputData<T>>
  ): Promise<InputCheckResult<T>> {
    if (!this.config) return { value };
    return loadAndCheckNumber(value, this.config!);
  }

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    return {
      default: this.config.default,
      max: this.config.max,
      min: this.config.min,
      step: this.config.step,
    };
  }
}
