import RichTextModule from "@dabsi/system/rich-text";
import { RichTextInput } from "@dabsi/system/rich-text/common/RichTextInput";
import { AbstractInputHandler } from "@dabsi/typerpc/input/AbstractInputHandler";
import { ErrorOrValue } from "@dabsi/typerpc/input/Input";
import { RpcChildConfig } from "@dabsi/typerpc/Rpc";
import { IWidgetHandler } from "@dabsi/typerpc/widget/Widget";

type T = RichTextInput;

declare global {
  interface RichTextInputConfig {
    module: RichTextModule;
  }
}
export class RichTextInputHandler
  extends AbstractInputHandler<T>
  implements IWidgetHandler<T> {
  $pluginsConfig: RpcChildConfig<T, "plugins"> = {
    getNamespaceConfig: (rpc, key) => {
      return this.config.module.plugins.getInputRpcConfig(this.config, rpc);
    },
  };

  async loadAndCheck(data: any): Promise<ErrorOrValue<never, any>> {
    return { value: "rich-text-value-form-data" };
  }

  getValueFromConfig(valueConfig: any) {
    return <any>"rich-text-value-from-config";
  }
  async getValueElement(value: any): Promise<any> {
    return "";
  }
  async getInputElement(): Promise<RichTextInputElement> {
    const element: RichTextInputElement = <any>{};
    await this.config.module.plugins.buildInputElement.invoke(
      this.config,
      element
    );
    return element;
  }
}
