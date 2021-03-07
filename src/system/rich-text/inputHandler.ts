import { Expect } from "@dabsi/common/typings2/Expect";
import { RichTextContent } from "@dabsi/system/rich-text/common/content";
import {
  RichTextInput,
  RichTextInputElement,
} from "@dabsi/system/rich-text/common/input";
import { RichTextDocument } from "@dabsi/system/rich-text/entities/Document";
import { BasedType, RebaseType } from "@dabsi/typedata/BaseType";
import { DataSource } from "@dabsi/typedata/source";
import { AbstractInputHandler } from "@dabsi/typerpc/input/AbstractInputHandler";
import {
  ErrorOrValue,
  InputValue,
  InputValueConfig,
  InputValueElement,
} from "@dabsi/typerpc/input/Input";
import { RpcChildConfig } from "@dabsi/typerpc/Rpc";
import { IWidgetHandler } from "@dabsi/typerpc/widget/Widget";
import { RichTextInputValue } from "./inputValue";

type T = RichTextInput;

declare global {
  interface TypeRefs {
    [RichTextInput.ValueConfig]: DataSource<BasedType<RichTextDocument>>;
    [RichTextInput.Value]: RichTextInputValue;
  }
}

export default class RichTextInputHandler
  extends AbstractInputHandler<T>
  implements IWidgetHandler<T> {
  $pluginsConfig: RpcChildConfig<
    T,
    "plugins"
  > = this.config.context.createRpcConfig({
    ...this.config,
    editable: true,
  });

  async loadAndCheck(
    content: RichTextContent.Unpacked
  ): Promise<ErrorOrValue<never, InputValue<T>>> {
    return { value: new RichTextInputValue(this.config, () => content) };
  }

  async getInputValueFromConfig(
    valueConfig: InputValueConfig<T>
  ): Promise<InputValue<T>> {
    return new RichTextInputValue(this.config, () => {
      if (!valueConfig) return null;

      if (valueConfig && typeof valueConfig === "object") {
        return this.config.context.unpack(
          this.config,
          valueConfig.rebase(),
          false
        );
      }
      // return this.config.context.unpack(this.config,)
      return null;
    });
  }

  async getInputValueElement(
    value: InputValue<T>
  ): Promise<InputValueElement<T>> {
    return value.getContent();
  }

  async getInputElement(): Promise<RichTextInputElement> {
    const element: RichTextInputElement = <any>{};
    await this.config.context.module.buildInputElement.invoke(
      this.config,
      element
    );
    return element;
  }
}
