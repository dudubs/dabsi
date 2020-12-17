import { Awaitable } from "@dabsi/common/typings2/Async";
import {
  ErrorOrValue,
  InputElement,
  InputError,
  InputValue,
  InputValueConfig,
  InputValueData,
  InputValueElement,
} from "@dabsi/typerpc/input/Input";
import { AbstractNullableInputHandler } from "@dabsi/typerpc/input/nullable-input/AbstractNullableInputHandler";
import { AnyEnumInput } from "@dabsi/typerpc/input/enum-input/EnumInput";

type T = AnyEnumInput;

export class EnumInputHandler extends AbstractNullableInputHandler<T> {
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

  async getInputElement(): Promise<InputElement<T>> {
    return {};
  }

  getValueElement(
    value: InputValue<T> | undefined
  ): Promise<InputValueElement<T>> {
    return Promise.resolve(value);
  }
}
