import { pick } from "../../../common/object/pick";
import { Lazy } from "../../../common/patterns/lazy";
import { Awaitable } from "../../../common/typings2/Async";
import { RequireOptionalKeys } from "../../../common/typings2/RequireOptionalKeys";
import { RpcUnresolvedConfig } from "../../Rpc";
import { IWidgetHandler } from "../../widget/Widget";
import { AbstractInputHandler } from "../AbstractInputHandler";
import {
  InputElement,
  InputErrorOrValue,
  InputValue,
  InputValueConfig,
  InputValueData,
  InputValueElement,
} from "../Input";
import { TextInput } from "./TextInput";
import { TextInputLoader, TextLoaderOptions } from "./TextInputLoader";

type T = TextInput<any>;

export class TextInputHandler
  extends AbstractInputHandler<T>
  implements IWidgetHandler<T> {
  async getValueElement(
    value: InputValue<T> | undefined
  ): Promise<InputValueElement<T>> {
    return value ?? "";
  }

  @Lazy() get loaderOptions(): TextLoaderOptions {
    return { ...this.rpc.loaderOptions, ...this.config };
  }

  async getInputElement(): Promise<InputElement<T>> {
    return {
      minLength: this.loaderOptions.minLength,
      maxLength: this.loaderOptions.maxLength,
      pattern: this.loaderOptions.pattern?.source,
      trim: this.loaderOptions.trim,
      required: this.loaderOptions.required,
    };
  }

  async loadAndCheck(
    valueData: InputValueData<T>
  ): Promise<InputErrorOrValue<T>> {
    const value = await TextInputLoader.load(this.config, valueData);
    const error = TextInputLoader.check(this.config, valueData);
    if (error !== undefined) return { error, value };
    if (!value && this.rpc.nullable) {
      return { value: null };
    }
    return { value };
  }

  getValueFromConfig(
    valueConfig: InputValueConfig<T>
  ): Awaitable<InputValue<T>> {
    return valueConfig || "";
  }
}
