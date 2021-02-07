import {
  RichTextInput,
  RichTextInputElement,
} from "@dabsi/system/rich-text/common/input";
import { RichTextContent } from "@dabsi/system/rich-text/content";

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
    data: RichTextContent.Unpacked
  ): Promise<ErrorOrValue<never, InputValue<T>>> {
    return { value: () => data };
  }

  async getValueFromConfig(
    valueConfig: InputValueConfig<T>
  ): Promise<InputValue<T>> {
    return valueConfig;
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
