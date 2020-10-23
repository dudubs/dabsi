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
import { AbstractWidgetHandler } from "../widget/ AbstractWidgetHandler";
import { IWidgetHandler, WidgetElement } from "../widget/Widget";

export abstract class AbstractInputHandler<R extends AnyInput>
  extends AbstractWidgetHandler<R>
  implements IWidgetHandler<IInput> {
  abstract loadAndCheck(
    valueData: InputValueData<R>
  ): Promise<InputErrorOrValue<R>>;

  abstract getValueElement(
    value: InputValue<R> | undefined
  ): Promise<InputValueElement<R>>;

  abstract getInputElement(): Promise<RequireOptionalKeys<InputElement<R>>>;

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<R>>> {
    return {
      ...(await this.getInputElement()),
      value: await this.getValueElement(undefined),
    };
  }

  async handleCheck(
    data: InputValueData<R>
  ): Promise<InputError<R> | undefined> {
    const result = await this.loadAndCheck(data);
    if ("error" in result) {
      return result.error;
    }
  }
}
