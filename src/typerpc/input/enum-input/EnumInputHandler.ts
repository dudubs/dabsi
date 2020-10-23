import { RequireOptionalKeys } from "../../../common/typings";
import { RpcUnresolvedConfig } from "../../Rpc";
import { WidgetController, WidgetElement } from "../../widget/Widget";
import { AbstractInputHandler } from "../AbstractInputHandler";
import { AbstractNullableInputHandler } from "../nullable-input/AbstractNullableInputHandler";
import {
  ErrorOrValue,
  InputError,
  InputErrorOrValue,
  InputValue,
  InputValueData,
} from "../Input";
import { ValueOrAwaitableFn } from "../ValueOrAwaitableFn";
import { AnyEnumInput, EnumInput } from "./EnumInput";

type T = AnyEnumInput;
export class EnumInputHandler extends AbstractNullableInputHandler<T> {
  getConfigForValue(value: InputValue<T>): RpcUnresolvedConfig<T> {
    return { ...this.config, default: value! };
  }

  getControllerConfig(): RpcUnresolvedConfig<WidgetController<T>> {
    return undefined;
  }

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    return { default: (await ValueOrAwaitableFn(this.config.default))! };
  }

  async loadAndCheckNotNull(
    valueData: NonNullable<InputValueData<T>>
  ): Promise<ErrorOrValue<InputError<T>, NonNullable<InputValue<T>>>> {
    if (!this.rpc.keys.has(valueData)) {
      return { error: "INVALID", value: undefined };
    }
    return { value: valueData };
  }
}
