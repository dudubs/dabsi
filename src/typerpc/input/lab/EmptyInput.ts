import { Awaitable } from "../../common/typings";
import { NoRpc } from "../NoRpc";
import { RpcConfigOld } from "../old/Old";
import {
  WidgetConfig,
  WidgetController,
  WidgetElement,
  WidgetType,
} from "../widget/Widget";
import { AbstractInputContext } from "./AbstractInputContext";
import {
  Input,
  InputCheckResultType,
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
  ): WidgetConfig<WidgetType<T>> {
    throw new Error();
  }

  getDefaultValue(): Awaitable<InputValue<T> | undefined> {
    return undefined;
  }

  getControllerConfig(): RpcConfigOld<WidgetController<T>> {
    throw new Error();
  }

  getElement(): Promise<WidgetElement<T>> {
    throw new Error();
  }

  loadAndCheck(data: InputData<T>): Promise<InputCheckResultType<T>> {
    throw new Error();
  }
}

export function EmptyInput() {
  return Input<EmptyInput>({
    context: EmptyInputContext,
    getValueElementFromElement(element) {
      throw new Error();
    },

    getValueData() {
      throw new Error();
    },
  });
}
