import { RequireOptionalKeys } from "../../../common/typings2/RequireOptionalKeys";
import { Rejectable } from "../../../common/async/Rejectable";
import { AnyInput, InputValueData } from "../../input/Input";
import { ValueOrAwaitableFn } from "../../input/ValueOrAwaitableFn";
import { RpcUnresolvedConfig } from "../../Rpc";
import { AbstractWidgetHandler } from "../AbstractWidgetHandler";
import { AnyForm, FormSubmitError } from "./Form";
import { IWidgetHandler, WidgetElement } from "../Widget";

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
