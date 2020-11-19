import { Awaitable } from "../../../common/typings2/Async";
import { RequireOptionalKeys } from "../../../common/typings2/RequireOptionalKeys";
import { RpcUnresolvedConfig } from "../../Rpc";
import { WidgetController } from "../../widget/Widget";
import { AbstractInputHandler } from "../AbstractInputHandler";
import {
  InputElement,
  InputErrorOrValue,
  InputValue,
  InputValueConfig,
  InputValueData,
  InputValueElement,
} from "../Input";
import { BoolInput } from "./BoolInput";

type T = BoolInput;

export class BoolInputHandler extends AbstractInputHandler<T> {
  getValueFromConfig(
    valueConfig: InputValueConfig<T>
  ): Awaitable<InputValue<T>> {
    return valueConfig || false;
  }

  async getValueElement(
    value: InputValue<T> | undefined
  ): Promise<InputValueElement<T>> {
    return Boolean(value);
  }

  getControllerConfig(): RpcUnresolvedConfig<WidgetController<T>> {
    return undefined;
  }

  getInputElement(): Promise<RequireOptionalKeys<InputElement<T>>> {
    return Promise.resolve({});
  }

  async loadAndCheck(
    valueData: InputValueData<T>
  ): Promise<InputErrorOrValue<T>> {
    return { value: valueData ?? false };
  }
}
