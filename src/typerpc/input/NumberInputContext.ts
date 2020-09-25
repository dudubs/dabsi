import { RequireOptionalKeys } from "../../common/typings";
import { RpcConfig } from "../Rpc";
import {
  WidgetConfig,
  WidgetController,
  WidgetElement,
} from "../widget/Widget";
import { AbstractInputContext } from "./AbstractInputContext";
import { AbstractNullableInputContext } from "./AbstractNullableInputContext";
import { InputCheckResult, InputData, InputType, InputValue } from "./Input";
import { NumberInput } from "./NumberInput";
import { loadAndCheckNumber } from "./NumberSchema";

type T = NumberInput;

export class NumberInputContext extends AbstractInputContext<T> {
  protected getInputConfigForValue(
    value: InputType<T>["Value"]
  ): WidgetConfig<InputType<T>> {
    return { ...this.config, default: value };
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

  getDataFromValue(value: InputValue<T>): InputData<T> {
    return value;
  }
}
