import { RequireOptionalKeys } from "../../../common/typings2/RequireOptionalKeys";
import { RpcUnresolvedConfig } from "../../Rpc";
import { WidgetController } from "../../widget/Widget";
import { AbstractInputHandler } from "../AbstractInputHandler";
import {
  InputElement,
  InputErrorOrValue,
  InputValue,
  InputValueElement,
} from "../Input";
import { ValueOrAwaitableFn } from "../ValueOrAwaitableFn";
import { NumberInput } from "./NumberInput";
import { NumberInputLoader } from "./NumberInputLoader";

export type T = NumberInput;

export class NumberInputHandler extends AbstractInputHandler<T> {
  async getValueElement(
    value: InputValue<T> | undefined
  ): Promise<InputValueElement<T>> {
    return (
      value ??
      (await ValueOrAwaitableFn(this.config.default)) ??
      this.config.minValue ??
      0
    );
  }

  getControllerConfig(): RpcUnresolvedConfig<WidgetController<T>> {
    return undefined;
  }

  async loadAndCheck(data: any): Promise<InputErrorOrValue<T>> {
    const value = NumberInputLoader.load(this.config, data);
    const error = NumberInputLoader.check(this.config, value);
    if (error !== undefined) return { error, value };
    return { value };
  }

  async getInputElement(): Promise<RequireOptionalKeys<InputElement<T>>> {
    return {
      maxValue: this.config.maxValue,
      minValue: this.config.minValue,
    };
  }
}
