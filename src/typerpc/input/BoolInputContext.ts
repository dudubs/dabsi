import { Awaitable, RequireOptionalKeys } from "../../common/typings";
import { RpcConfig } from "../Rpc";
import {
  WidgetConfig,
  WidgetController,
  WidgetElement,
  WidgetType,
} from "../widget/Widget";
import { AbstractInputContext } from "./AbstractInputContext";
import { BoolInput } from "./BoolInput";
import { InputCheckResult, InputData, InputType, InputValue } from "./Input";

type T = BoolInput;

export class BoolInputContext extends AbstractInputContext<BoolInput> {
  protected getInputConfigForValue(
    value: InputType<T>["Value"]
  ): WidgetConfig<WidgetType<T>> {
    return { ...this.config, default: value };
  }

  getDefaultValue(): Awaitable<InputValue<BoolInput> | undefined> {
    return this.config.default;
  }

  getControllerConfig(): RpcConfig<WidgetController<BoolInput>> {
    return null;
  }

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<BoolInput>>> {
    return {
      default: this.config.default,
    };
  }

  async loadAndCheck(
    data: InputData<BoolInput>
  ): Promise<InputCheckResult<BoolInput>> {
    return { value: Boolean(data) };
  }
}
