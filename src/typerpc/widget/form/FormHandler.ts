import { RequireOptionalKeys } from "../../../common/typings2/RequireOptionalKeys";
import { AnyInput, InputValueData } from "../../input/Input";
import { ValueOrAwaitableFn } from "../../input/ValueOrAwaitableFn";
import { RpcUnresolvedConfig } from "../../Rpc";
import { AbstractWidgetHandler } from "../AbstractWidgetHandler";
import { AnyForm, FormSubmitError } from "./Form";
import { IWidgetHandler, WidgetController, WidgetElement } from "../Widget";

type T = AnyForm;

export class FormHandler
  extends AbstractWidgetHandler<T>
  implements IWidgetHandler<AnyForm> {
  getControllerConfig(): RpcUnresolvedConfig<WidgetController<T>> {
    return this.config.inputConfig;
  }

  async handleSubmit(valueData: InputValueData<AnyInput>) {
    const inputResult = await (await this.controller).loadAndCheck(valueData);
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
  }

  async getElement(state): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    const value = await ValueOrAwaitableFn(this.config.valueConfig);
    if (value !== undefined) {
      const element = await this.controller.then(c => c.getInputElement());
      return { ...element, value };
    }
    return this.controller.then(c => c.getElement(state));
  }
}
