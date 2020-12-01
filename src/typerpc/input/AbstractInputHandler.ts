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
  InputWithoutController,
  InputElement,
  InputErrorOrValue,
  InputValue,
  InputValueConfig,
  InputValueData,
  InputValueElement,
} from "./Input";

export abstract class AbstractInputHandler<T extends AnyInput>
  extends AbstractWidgetHandler<T>
  implements IWidgetHandler<InputWithoutController> {
  abstract loadAndCheck(data: InputValueData<T>): Promise<InputErrorOrValue<T>>;

  $checkCommand = async data => {
    const result = await this.loadAndCheck(data);
    if ("error" in result) {
      return result.error;
    }
  };

  abstract getValueFromConfig(
    valueConfig: InputValueConfig<T>
  ): Awaitable<InputValue<T>>;

  abstract getValueElement(
    value: InputValue<T> | undefined
  ): Promise<InputValueElement<T>>;

  abstract getInputElement(): Promise<InputElement<T>>;

  async getElement(
    state: WidgetElementState<T> | undefined
  ): Promise<WidgetElement<T>> {
    return {
      ...(await this.getInputElement()),
      value: await this.getValueElement(undefined),
    } as RequireOptionalKeys<WidgetElement<T>>;
  }
}
