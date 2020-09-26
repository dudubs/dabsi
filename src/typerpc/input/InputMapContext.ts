import { entries } from "../../common/object/entries";
import { hasKeys } from "../../common/object/hasKeys";
import { RequireOptionalKeys } from "../../common/typings";
import { RpcConfig } from "../Rpc";
import {
  WidgetConfig,
  WidgetController,
  WidgetElement,
} from "../widget/Widget";
import { AbstractInputContext } from "./AbstractInputContext";
import { InputCheckResult, InputData, InputType, InputValue } from "./Input";
import { AnyInputMap, InputMap } from "./InputMap";

type T = InputMap<AnyInputMap>;

export class InputMapContext extends AbstractInputContext<T> {
  getControllerConfig(): RpcConfig<WidgetController<T>> {
    return this.config;
  }

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    const items: any = {};
    for (const [key, input] of entries(this.controllerProps.items)) {
      try {
        items[key] = await input.getContext(this.config[key]).getElement();
      } catch (error) {
        throw error;
      }
    }
    return { items };
  }

  async loadAndCheck(data: InputData<T>): Promise<InputCheckResult<T>> {
    const keyToError: any = {};
    const keyToValue: any = {};
    for (const [key, field] of entries(this.controllerProps.items)) {
      const result = await field
        .getContext(this.config[key])
        .loadAndCheck(data[key]);
      if ("error" in result) {
        keyToError[key] = result.error;
      } else {
        keyToValue[key] = result.value;
      }
    }
    return hasKeys(keyToError)
      ? { error: { items: keyToError }, value: keyToValue }
      : { value: keyToValue };
  }

  getDataFromValue(value: InputValue<T>): InputData<T> {
    const data: InputData<T> = {};
    for (const [key, field] of entries(this.controllerProps.items)) {
      data[key] = field
        .getContext(this.config?.[key])
        .getDataFromValue(value[key]);
    }
    return data;
  }

  protected getInputConfigForValue(
    keyToValue: InputType<T>["Value"]
  ): WidgetConfig<InputType<T>> {
    const config = {};
    for (const [key, value] of entries(keyToValue)) {
      config[key] = this.controllerProps.items[key]
        .getContext(this.config[key])
        .getConfigForValue(value);
    }
    return config;
  }
}
