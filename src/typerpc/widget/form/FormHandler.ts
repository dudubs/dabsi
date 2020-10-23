import { InputValueData } from "../../input/Input";
import { ValueOrAwaitableFn } from "../../input/ValueOrAwaitableFn";
import { RpcUnresolvedConfig } from "../../Rpc";
import { AbstractWidgetHandler } from "../ AbstractWidgetHandler";
import { AnyForm, FormInput } from "./Form";
import { IWidgetHandler, WidgetController, WidgetElement } from "../Widget";

export class FormHandler<T extends AnyForm>
  extends AbstractWidgetHandler<T>
  implements IWidgetHandler<AnyForm> {
  getControllerConfig(): RpcUnresolvedConfig<WidgetController<T>> {
    return this.config.inputConfig;
  }

  async handleSubmit(valueData: InputValueData<FormInput<T>>) {
    const inputResult = await this.controllerHandler.then(input =>
      input.loadAndCheck(valueData)
    );
    if ("error" in inputResult) return { inputError: inputResult.error };
    const submitResult = await this.config.submit(inputResult.value);
    if (submitResult == null) return { value: null };
    if (typeof submitResult !== "object" || Array.isArray(submitResult))
      return { value: submitResult };

    return submitResult;
  }

  async getElement(): Promise<WidgetElement<T>> {
    const value = await ValueOrAwaitableFn(this.config.default);
    const element = await this.controllerHandler.then(c => c.getInputElement());
    if (value !== undefined) {
      return { ...element, value };
    }
    return element;
  }
}
