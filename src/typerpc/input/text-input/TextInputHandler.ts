import { RequireOptionalKeys } from "../../../common/typings";
import { RpcUnresolvedConfig } from "../../Rpc";
import { AbstractInputHandler } from "../AbstractInputHandler";
import { WidgetController, WidgetElement } from "../../widget/Widget";
import {
  InputElement,
  InputErrorOrValue,
  InputValue,
  InputValueData,
  InputValueElement,
} from "../Input";
import { TextInputLoader } from "./TextInputLoader";
import { ValueOrAwaitableFn } from "../ValueOrAwaitableFn";
import { TextInput } from "./TextInput";

type T = TextInput;

export class TextInputHandler extends AbstractInputHandler<T> {
  async getValueElement(
    value: InputValue<T> | undefined
  ): Promise<InputValueElement<T>> {
    return value ?? (await ValueOrAwaitableFn(this.config.default)) ?? "";
  }

  getControllerConfig(): RpcUnresolvedConfig<WidgetController<T>> {
    return undefined;
  }

  async getInputElement(): Promise<RequireOptionalKeys<InputElement<T>>> {
    return {
      minLength: this.config.minLength,
      maxLength: this.config.maxLength,
      pattern: this.config.pattern?.source,
      trim: this.config.trim,
      required: this.config.required,
    };
  }

  async loadAndCheck(
    valueData: InputValueData<T>
  ): Promise<InputErrorOrValue<T>> {
    const value = await TextInputLoader.load(this.config, valueData);
    const error = TextInputLoader.check(this.config, valueData);
    if (error !== undefined) return { error, value };
    return { value };
  }
}
