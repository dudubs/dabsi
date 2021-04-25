import { Rejectable } from "@dabsi/common/async/Rejectable";
import { ConfigOrFactory } from "@dabsi/old-typerpc/ConfigFactory";
import { AnyInput, InputValueData } from "@dabsi/old-typerpc/input/Input";
import { RpcChildConfig } from "@dabsi/old-typerpc/Rpc";
import { AbstractWidgetHandler } from "@dabsi/old-typerpc/widget/AbstractWidgetHandler";
import { AnyForm } from "@dabsi/old-typerpc/widget/form/rpc";
import {
  IWidgetHandler,
  WidgetCommandConfig,
  WidgetElement,
} from "@dabsi/old-typerpc/widget/Widget";

type T = AnyForm;

export class FormHandler
  extends AbstractWidgetHandler<T>
  implements IWidgetHandler<AnyForm> {
  $inputConfig: RpcChildConfig<T, "input"> = this.config.inputConfig;

  $submitCommand: WidgetCommandConfig<T, "submit"> = async (
    valueData: InputValueData<AnyInput>
  ) => {
    const inputHandler = await this.getChildHandler("input");
    const inputResult = await inputHandler.loadAndCheck(valueData);
    if ("error" in inputResult) return { inputError: inputResult.error };
    return await Rejectable(this.config.submit, inputResult.value);
  };

  async getElement(state): Promise<WidgetElement<T>> {
    const valueConfig = await ConfigOrFactory(this.config.valueConfig);
    const inputHandler = await this.getChildHandler("input");
    if (valueConfig !== undefined) {
      const value = await inputHandler.getInputValueFromConfig(valueConfig);
      const valueElement =
        value !== undefined
          ? await inputHandler.getInputValueElement(value)
          : undefined;

      const element = await inputHandler.getInputElement();
      return { ...element, value: valueElement };
    }
    return inputHandler.getElement(state);
  }
}
