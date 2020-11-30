import { Awaitable } from "../../../common/typings2/Async";
import { AbstractInputHandler } from "../AbstractInputHandler";
import {
  InputElement,
  InputErrorOrValue,
  InputValue,
  InputValueConfig,
  InputValueElement,
} from "../Input";
import { NumberInput } from "./NumberInput";
import { NumberInputLoader } from "./NumberInputLoader";

export type T = NumberInput;

export class NumberInputHandler extends AbstractInputHandler<T> {
  getValueFromConfig(
    valueConfig: InputValueConfig<T>
  ): Awaitable<InputValue<T>> {
    return valueConfig ?? this.config.minValue ?? this.config.maxValue ?? 0;
  }

  async getValueElement(
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
