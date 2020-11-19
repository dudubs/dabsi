import { Awaitable } from "../../common/typings2/Async";
import { RequireOptionalKeys } from "../../common/typings2/RequireOptionalKeys";
import { AbstractWidgetHandler } from "../widget/AbstractWidgetHandler";
import {
  IWidgetHandler,
  WidgetElement,
  WidgetElementState,
} from "../widget/Widget";
import {
  AnyInput,
  IInput,
  InputElement,
  InputError,
  InputErrorOrValue,
  InputValue,
  InputValueConfig,
  InputValueData,
  InputValueElement,
} from "./Input";

export abstract class AbstractInputHandler<T extends AnyInput>
  extends AbstractWidgetHandler<T>
  implements IWidgetHandler<IInput> {
  abstract loadAndCheck(data: InputValueData<T>): Promise<InputErrorOrValue<T>>;

  abstract getValueFromConfig(
    valueConfig: InputValueConfig<T>
  ): Awaitable<InputValue<T>>;

  abstract getValueElement(
    value: InputValue<T> | undefined
  ): Promise<InputValueElement<T>>;

  abstract getInputElement(): Promise<RequireOptionalKeys<InputElement<T>>>;

  async getElement(
    state: WidgetElementState<T> | undefined
  ): Promise<RequireOptionalKeys<WidgetElement<T>>> {
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
