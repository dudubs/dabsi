import { RequireOptionalKeys } from "../../../common/typings2/RequireOptionalKeys";
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

    class _Error {
      constructor(public error) {}
    }

    try {
      return { value: await this.config.submit(inputResult.value, _Error) };
    } catch (error) {
      if (error.constructor === _Error) {
        return { error: error.error };
      }
      throw error;
    }
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
