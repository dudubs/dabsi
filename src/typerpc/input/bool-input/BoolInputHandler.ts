import { RequireOptionalKeys } from "../../../common/typings2/RequireOptionalKeys";
import { RpcUnresolvedConfig } from "../../Rpc";
import { WidgetController, WidgetElement } from "../../widget/Widget";
import { AbstractInputHandler } from "../AbstractInputHandler";
import {
  InputElement,
  InputErrorOrValue,
  InputValue,
  InputValueData,
  InputValueElement,
} from "../Input";
import { ValueOrAwaitableFn } from "../ValueOrAwaitableFn";
import { BoolInput } from "./BoolInput";

type T = BoolInput;

export class BoolInputHandler extends AbstractInputHandler<T> {
  async getValueElement(
    value: InputValue<T> | undefined
  ): Promise<InputValueElement<T>> {
    return value ?? (await ValueOrAwaitableFn(this.config.default)) ?? false;
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
