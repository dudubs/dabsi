import { Awaitable } from "@dabsi/common/typings2/Async";

import { AbstractInputHandler } from "@dabsi/typerpc/input/AbstractInputHandler";
import {
  InputElement,
  InputErrorOrValue,
  InputValue,
  InputValueConfig,
  InputValueData,
  InputValueElement,
} from "@dabsi/typerpc/input/Input";
import { BoolInput } from "@dabsi/typerpc/input/bool-input/BoolInput";

type T = BoolInput;

export class BoolInputHandler extends AbstractInputHandler<T> {
  getInputValueFromConfig(
    valueConfig: InputValueConfig<T>
  ): Awaitable<InputValue<T>> {
    return valueConfig || false;
  }

  async getInputValueElement(
    value: InputValue<T> | undefined
  ): Promise<InputValueElement<T>> {
    return Boolean(value);
  }

  getInputElement(): Promise<InputElement<T>> {
    return Promise.resolve({});
  }

  async loadAndCheck(
    valueData: InputValueData<T>
  ): Promise<InputErrorOrValue<T>> {
    return { value: valueData ?? false };
  }
}
