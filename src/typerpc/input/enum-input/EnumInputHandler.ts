import { Awaitable } from "../../../common/typings2/Async";
import { RequireOptionalKeys } from "../../../common/typings2/RequireOptionalKeys";
import { RpcUnresolvedConfig } from "../../Rpc";
import { WidgetController, WidgetElement } from "../../widget/Widget";
import { AbstractInputHandler } from "../AbstractInputHandler";
import { AbstractNullableInputHandler } from "../nullable-input/AbstractNullableInputHandler";
import {
  ErrorOrValue,
  InputElement,
  InputError,
  InputErrorOrValue,
  InputValue,
  InputValueConfig,
  InputValueData,
  InputValueElement,
} from "../Input";
import { ValueOrAwaitableFn } from "../ValueOrAwaitableFn";
import { AnyEnumInput, EnumInput } from "./EnumInput";

type T = AnyEnumInput;

export class EnumInputHandler extends AbstractNullableInputHandler<T> {
  getControllerConfig(): RpcUnresolvedConfig<WidgetController<T>> {
    return undefined;
  }

  getValueFromConfig(
    valueConfig: InputValueConfig<T>
  ): Awaitable<InputValue<T>> {
    return valueConfig;
  }

  async loadAndCheckNotNull(
    valueData: NonNullable<InputValueData<T>>
  ): Promise<ErrorOrValue<InputError<T>, NonNullable<InputValue<T>>>> {
    if (!this.rpc.keys.has(valueData)) {
      return { error: "INVALID_ENUM_KEY", value: undefined };
    }
    return { value: valueData };
  }

  async getInputElement(): Promise<RequireOptionalKeys<InputElement<T>>> {
    return {};
  }

  getValueElement(
    value: InputValue<T> | undefined
  ): Promise<InputValueElement<T>> {
    return Promise.resolve(value);
  }
}
