import { RequireOptionalKeys } from "@dabsi/common/typings2/RequireOptionalKeys";
import { Rejectable } from "@dabsi/common/async/Rejectable";
import { AnyInput, InputValueData } from "@dabsi/typerpc/input/Input";
import { ValueOrAwaitableFn } from "@dabsi/typerpc/input/ValueOrAwaitableFn";
import { RpcUnresolvedConfig } from "@dabsi/typerpc/Rpc";
import { AbstractWidgetHandler } from "@dabsi/typerpc/widget/AbstractWidgetHandler";
import { AnyForm, FormSubmitError } from "@dabsi/typerpc/widget/form/Form";
import { IWidgetHandler, WidgetElement } from "@dabsi/typerpc/widget/Widget";

type T = AnyForm;

export class FormHandler
  extends AbstractWidgetHandler<T>
  implements IWidgetHandler<AnyForm> {
  $inputConfig = this.config.inputConfig;

  $submitCommand = async (valueData: InputValueData<AnyInput>) => {
    const inputHandler = await this.getChildHandler("input");
    const inputResult = await inputHandler.loadAndCheck(valueData);
    if ("error" in inputResult) return { inputError: inputResult.error };
    return await Rejectable(this.config.submit, inputResult.value);
  };

  async getElement(state): Promise<WidgetElement<T>> {
    const value = await ValueOrAwaitableFn(this.config.valueConfig);
    const inputHandler = await this.getChildHandler("input");
    if (value !== undefined) {
      const element = await inputHandler.getInputElement();
      return { ...element, value };
    }
    return inputHandler.getElement(state);
  }
}
