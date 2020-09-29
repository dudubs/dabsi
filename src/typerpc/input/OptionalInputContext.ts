import { RequireOptionalKeys } from "../../common/typings";
import { RpcConfig } from "../Rpc";
import {
  WidgetConfig,
  WidgetController,
  WidgetElement,
} from "../widget/Widget";
import { AbstractInputContext } from "./AbstractInputContext";
import {
  AnyInput,
  InputCheckResult,
  InputData,
  InputType,
  InputValue,
} from "./Input";
import { OptionalInput } from "./OptionalInput";

export type T = OptionalInput<AnyInput>;

export class OptionalInputContext extends AbstractInputContext<T> {
  getControllerConfig(): RpcConfig<WidgetController<T>> {
    return this.config;
  }

  getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    return this.controllerContext.getElement();
  }

  protected getInputConfigForValue(
    value: InputType<T>["Value"]
  ): WidgetConfig<InputType<T>> {
    return undefined;
  }

  async loadAndCheck(data: InputData<T>): Promise<InputCheckResult<T>> {
    if (data != null) {
      return this.controllerContext.loadAndCheck(data);
    }
    return { value: null };
  }
}
