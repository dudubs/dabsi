import { NoRpc } from "../NoRpc";
import { RpcConfig } from "../Rpc";
import {
  WidgetConfig,
  WidgetController,
  WidgetElement,
} from "../widget/Widget";
import { AbstractInputContext } from "./AbstractInputContext";
import {
  Input,
  InputCheckResult,
  InputData,
  InputType,
  InputValue,
} from "./Input";

export type EmptyInput = Input<{
  Data: never;

  Value: never;

  ValueElement: never;

  Props: {};

  Config: undefined;

  Element: object;

  Controller: NoRpc;

  Error: never;
}>;

type T = EmptyInput;

export class EmptyInputContext extends AbstractInputContext<T> {
  protected getInputConfigForValue(
    value: InputType<T>["Value"]
  ): WidgetConfig<InputType<T>> {
    throw new Error();
  }

  getControllerConfig(): RpcConfig<WidgetController<T>> {
    throw new Error();
  }

  getElement(): Promise<WidgetElement<T>> {
    throw new Error();
  }

  loadAndCheck(data: InputData<T>): Promise<InputCheckResult<T>> {
    throw new Error();
  }
}

export function EmptyInput() {
  return Input<EmptyInput>({
    context: EmptyInputContext,
    getValueElementFromElement(element) {
      throw new Error();
    },

    getDataFromValueElement() {
      throw new Error();
    },
  });
}
