import {
  RichTextInput,
  RichTextInputElement,
} from "@dabsi/system/rich-text/common/RichTextInput";
import { RichTextInputValue } from "@dabsi/system/rich-text/common/RichTextInputValue";
import { AbstractInputHandler } from "@dabsi/typerpc/input/AbstractInputHandler";
import {
  ErrorOrValue,
  InputValue,
  InputValueConfig,
  InputValueElement,
} from "@dabsi/typerpc/input/Input";
import { RpcChildConfig } from "@dabsi/typerpc/Rpc";
import { IWidgetHandler } from "@dabsi/typerpc/widget/Widget";

type T = RichTextInput;

export class RichTextInputHandler
  extends AbstractInputHandler<T>
  implements IWidgetHandler<T> {
  $pluginsConfig: RpcChildConfig<
    T,
    "plugins"
  > = this.config.context.createPluginsConfig({
    ...this.config,
    editable: true,
  });

  async loadAndCheck(
    data: Draft.RawDraftContentState
  ): Promise<ErrorOrValue<never, RichTextInputValue>> {
    return {
      value: {
        config: this.config,
        getContent: () => data,
      },
    };
  }

  async getValueFromConfig(
    valueConfig: InputValueConfig<T>
  ): Promise<InputValue<T>> {
    return {
      config: this.config,
      getContent: async () => {
        const docKey: string | null =
          typeof valueConfig === "string"
            ? valueConfig
            : typeof valueConfig === "object"
            ? valueConfig.$key
            : null;

        if (docKey) {
          return this.config.context.unpack(docKey);
        }
        return null;
      },
    };
  }

  async getValueElement(value: InputValue<T>): Promise<InputValueElement<T>> {
    return null;
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
