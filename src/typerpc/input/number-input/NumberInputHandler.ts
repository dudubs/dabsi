import { RequireOptionalKeys } from "../../../common/typings";
import { RpcUnresolvedConfig } from "../../Rpc";
import { AbstractInputHandler } from "../AbstractInputHandler";
import { WidgetController, WidgetElement } from "../../widget/Widget";
import { InputErrorOrValue, InputValue, InputValueElement } from "../Input";
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
      this.config.min ??
      0
    );
  }

  getControllerConfig(): RpcUnresolvedConfig<WidgetController<T>> {
    return undefined;
  }

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    return {
      default: await ValueOrAwaitableFn(this.config.default),
      max: this.config.max,
      min: this.config.min,
      step: this.config.step,
    };
  }

  async loadAndCheck(valueData: any): Promise<InputErrorOrValue<T>> {
    const value = NumberInputLoader.load(this.config, valueData);
    const error = NumberInputLoader.check(this.config, value);
    if (error !== undefined) return { error, value };
    return { value };
  }
}
