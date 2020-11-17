import { RequireOptionalKeys } from "../../../common/typings2/RequireOptionalKeys";
import { AnyInput, InputValueData } from "../../input/Input";
import { ValueOrAwaitableFn } from "../../input/ValueOrAwaitableFn";
import { RpcUnresolvedConfig } from "../../Rpc";
import { AbstractWidgetHandler } from "../AbstractWidgetHandler";
import { AnyForm } from "./Form";
import { IWidgetHandler, WidgetController, WidgetElement } from "../Widget";

type T = AnyForm;

export class FormHandler
  extends AbstractWidgetHandler<T>
  implements IWidgetHandler<AnyForm> {
  getControllerConfig(): RpcUnresolvedConfig<WidgetController<T>> {
    return this.config.inputConfig;
  }

  async handleSubmit(valueData: InputValueData<AnyInput>) {
    const inputResult = await this.controller.then(input =>
      input.loadAndCheck(valueData)
    );
    if ("error" in inputResult) return { inputError: inputResult.error };
    const submitResult = await this.config.submit(inputResult.value);
    if (submitResult == null) return { value: null };
    if (typeof submitResult !== "object" || Array.isArray(submitResult))
      return { value: submitResult };

    return submitResult;
  }

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    const value = await ValueOrAwaitableFn(this.config.default);
    if (value !== undefined) {
      const element = await this.controller.then(c => c.getInputElement());
      return { ...element, value };
    }
    return this.controller.then(c => c.getElement());
  }
}
