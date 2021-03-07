import { Awaitable } from "@dabsi/common/typings2/Async";
import { RequireOptionalKeys } from "@dabsi/common/typings2/RequireOptionalKeys";
import { AbstractWidgetHandler } from "@dabsi/typerpc/widget/AbstractWidgetHandler";
import {
  IWidgetHandler,
  WidgetElement,
  WidgetElementState,
} from "@dabsi/typerpc/widget/Widget";
import {
  AnyInput,
  InputWithoutController,
  InputElement,
  InputErrorOrValue,
  InputValue,
  InputValueConfig,
  InputValueData,
  InputValueElement,
} from "@dabsi/typerpc/input/Input";

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

  abstract getInputValueFromConfig(
    valueConfig: InputValueConfig<T>
  ): Awaitable<InputValue<T>>;

  abstract getInputValueElement(
    value: InputValue<T> | undefined
  ): Promise<InputValueElement<T>>;

  abstract getInputElement(): Promise<InputElement<T>>;

  async getElement(
    state: WidgetElementState<T> | undefined
  ): Promise<WidgetElement<T>> {
    return {
      ...(await this.getInputElement()),
      value: await this.getInputValueElement(undefined),
    } as RequireOptionalKeys<WidgetElement<T>>;
  }
}
