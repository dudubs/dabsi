import { RequireOptionalKeys } from "../../common/typings";
import { RpcConfig, RpcError } from "../Rpc";
import {
  WidgetConfig,
  WidgetController,
  WidgetElement,
} from "../widget/Widget";
import { AbstractInputContext } from "./AbstractInputContext";
import { AbstractNullableInputContext } from "./AbstractNullableInputContext";
import { EnumInput } from "./EnumInput";
import { InputCheckResult, InputData, InputType, InputValue } from "./Input";
import { ValueOrAwaitableFn } from "./ValueOrAwaitableFn";

type T = EnumInput<string, any>;

export class EnumInputContext extends AbstractNullableInputContext<T> {
  getControllerConfig(): RpcConfig<WidgetController<T>> {
    return null;
  }

  protected getInputConfigForValue(
    value: InputType<T>["Value"]
  ): WidgetConfig<InputType<T>> {
    return { ...this.config, default: value ?? undefined };
  }

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    return { default: await ValueOrAwaitableFn(this.config.default) };
  }

  async loadAndCheckNotNull(
    data: NonNullable<InputData<T>>
  ): Promise<InputCheckResult<T>> {
    if (!this.props.keys.has(data)) {
      return { error: "INVALID", value: undefined };
    }
    return { value: data };
  }
}
