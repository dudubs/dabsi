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
import { loadAndCheckString } from "./StringSchema";
import { TextInput } from "./TextInput";
import { ValueOrAwaitableFn } from "./ValueOrAwaitableFn";

type T = TextInput;

export class TextInputContext extends AbstractInputContext<T> {
  protected getInputConfigForValue(
    value: InputType<T>["Value"]
  ): WidgetConfig<WidgetType<T>> {
    return { ...this.config, default: value };
  }

  getDefaultValue(): Awaitable<InputValue<T> | undefined> {
    return ValueOrAwaitableFn(this.config.default);
  }

  getControllerConfig(): RpcConfig<WidgetController<T>> {
    return null;
  }

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    return {
      default: await ValueOrAwaitableFn(this.config?.default),
      minLength: this.config.minLength,
      maxLength: this.config.maxLength,
      pattern: this.config.pattern,
      trim: this.config.trim,
      required: this.config.required,
    };
  }

  async loadAndCheck(value: InputData<T>): Promise<InputCheckResult<T>> {
    return loadAndCheckString(value || "", this.config);
  }
}
