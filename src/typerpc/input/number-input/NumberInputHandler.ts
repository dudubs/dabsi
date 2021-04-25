import { Awaitable } from "@dabsi/common/typings2/Async";
import { AbstractInputHandler } from "@dabsi/old-typerpc/input/AbstractInputHandler";
import {
  InputElement,
  InputErrorOrValue,
  InputValue,
  InputValueConfig,
  InputValueElement,
} from "@dabsi/old-typerpc/input/Input";
import { NumberInput } from "@dabsi/old-typerpc/input/number-input/NumberInput";
import { NumberInputLoader } from "@dabsi/old-typerpc/input/number-input/NumberInputLoader";

export type T = NumberInput;

export class NumberInputHandler extends AbstractInputHandler<T> {
  getInputValueFromConfig(
    valueConfig: InputValueConfig<T>
  ): Awaitable<InputValue<T>> {
    return valueConfig ?? this.config.minValue ?? this.config.maxValue ?? 0;
  }

  async getInputValueElement(
    value: InputValue<T> | undefined
  ): Promise<InputValueElement<T>> {
    return value ?? this.config.minValue ?? 0;
  }

  async loadAndCheck(data: any): Promise<InputErrorOrValue<T>> {
    const value = NumberInputLoader.load(this.config, data);
    const error = NumberInputLoader.check(this.config, value);
    if (error !== undefined) return { error, value };
    return { value };
  }

  async getInputElement(): Promise<InputElement<T>> {
    return {
      maxValue: this.config.maxValue,
      minValue: this.config.minValue,
    };
  }
}
