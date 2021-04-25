import { pick } from "@dabsi/common/object/pick";
import Lazy from "@dabsi/common/patterns/Lazy";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { RequireOptionalKeys } from "@dabsi/common/typings2/RequireOptionalKeys";
import { RpcUnresolvedConfig } from "@dabsi/old-typerpc/Rpc";
import { IWidgetHandler } from "@dabsi/old-typerpc/widget/Widget";
import { AbstractInputHandler } from "@dabsi/old-typerpc/input/AbstractInputHandler";
import {
  InputElement,
  InputErrorOrValue,
  InputValue,
  InputValueConfig,
  InputValueData,
  InputValueElement,
} from "@dabsi/old-typerpc/input/Input";
import { TextInput } from "@dabsi/old-typerpc/input/text-input/TextInput";
import {
  TextInputLoader,
  TextLoaderOptions,
} from "@dabsi/old-typerpc/input/text-input/TextInputLoader";

type T = TextInput<any>;

export class TextInputHandler
  extends AbstractInputHandler<T>
  implements IWidgetHandler<T> {
  async getInputValueElement(
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

  getInputValueFromConfig(
    valueConfig: InputValueConfig<T>
  ): Awaitable<InputValue<T>> {
    return valueConfig || "";
  }
}
