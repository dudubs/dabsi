import { entries } from "../../../common/object/entries";
import { hasKeys } from "../../../common/object/hasKeys";
import { Awaitable, RequireOptionalKeys } from "../../../common/typings";
import { RpcConfigOld } from "../../old/Old";
import {
  WidgetConfig,
  WidgetController,
  WidgetElement,
  WidgetType,
} from "../../widget/Widget";
import { AbstractInputContext } from "../AbstractInputContext";
import {
  InputCheckResultType,
  InputValueData,
  InputType,
  InputValue,
} from "../Input";
import { AnyInputRecord, InputMap } from "./InputMap";

type T = InputMap<AnyInputRecord>;

export class InputMapContext extends AbstractInputContext<T> {
  getControllerConfig(): RpcConfigOld<WidgetController<T>> {
    return this.config;
  }

  async getDefaultValue(): Promise<InputValue<T> | undefined> {
    const value = {};
    for (const [key, input] of entries(this.controllerProps.items)) {
      value[key] = await input
        .getContext(this.config[key])
        .call("getDefaultValue");
    }
    return value;
  }

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    const items: any = {};
    for (const [key, input] of entries(this.controllerProps.items)) {
      try {
        items[key] = await input
          .getContext(this.config[key])
          .call("getElement");
      } catch (error) {
        throw error;
      }
    }
    return { items };
  }

  async loadAndCheck(
    data: InputValueData<T>
  ): Promise<InputCheckResultType<T>> {
    const keyToError: any = {};
    const keyToValue: any = {};
    for (const [key, field] of entries(this.controllerProps.items)) {
      const result = await field
        .getContext(this.config[key])
        .call("loadAndCheck", data[key]);
      if ("error" in result) {
        keyToError[key] = result.error;
      } else {
        keyToValue[key] = result.value;
      }
    }
    return hasKeys(keyToError)
      ? { error: { children: keyToError }, value: keyToValue }
      : { value: keyToValue };
  }

  protected getInputConfigForValue(
    keyToValue: InputType<T>["Value"]
  ): WidgetConfig<WidgetType<T>> {
    const config = {};
    for (const [key, value] of entries(keyToValue)) {
      config[key] = this.controllerProps.items[key]
        .getContext(this.config[key])
        .call("getConfigForValue", value);
    }
    return config;
  }
}
