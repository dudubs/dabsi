import { RequireOptionalKeys } from "../../common/typings";
import {
  AnyInput,
  IInput,
  InputValueData,
  InputError,
  InputErrorOrValue,
  InputValue,
  InputValueElement,
  InputElement,
} from "./Input";
import {
  RpcResolvedConfig,
  RpcResolvedHandler,
  RpcUnresolvedConfig,
} from "../Rpc";
import { AbstractWidgetHandler } from "../widget/AbstractWidgetHandler";
import { IWidgetHandler, WidgetElement } from "../widget/Widget";

export abstract class AbstractInputHandler<T extends AnyInput>
  extends AbstractWidgetHandler<T>
  implements IWidgetHandler<IInput> {
  abstract loadAndCheck(data: InputValueData<T>): Promise<InputErrorOrValue<T>>;

  abstract getValueElement(
    value: InputValue<T> | undefined
  ): Promise<InputValueElement<T>>;

  abstract getInputElement(): Promise<RequireOptionalKeys<InputElement<T>>>;

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    return {
      ...(await this.getInputElement()),
      value: await this.getValueElement(undefined),
    } as RequireOptionalKeys<WidgetElement<T>>;
  }

  async handleCheck(
    data: InputValueData<T>
  ): Promise<InputError<T> | undefined> {
    const result = await this.loadAndCheck(data);
    if ("error" in result) {
      return result.error;
    }
  }
}
