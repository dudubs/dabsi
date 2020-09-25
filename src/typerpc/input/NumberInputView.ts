import { ReactNode } from "react";
import { Awaitable } from "../../common/typings";
import { ViewState } from "../../react/view/ViewState";
import { RpcConnection } from "../Rpc";
import { WidgetElement, WidgetType } from "../widget/Widget";
import { InputErrorOrData, InputView, InputViewProps } from "./InputView";
import { NumberInput } from "./NumberInput";

export class NumberInputView<
  C extends RpcConnection<NumberInput>
> extends InputView<
  C,
  InputViewProps<C> & {
    children(view: Readonly<NumberInputView<C>>): ReactNode;
  }
> {
  @ViewState() value2: number;

  protected updateElement(element: WidgetType<C>["Element"]) {
    this.value2 = element.default ?? 0;
  }

  setValue(value: number) {
    this.value2 = value;
  }

  freezeElement(): WidgetElement<C> {
    return { ...this.element, default: this.value2 };
  }

  getValidData(): Awaitable<InputErrorOrData<C>> {
    return { value: this.value2 };
  }

  renderView(): React.ReactNode {
    return this.props.children(this);
  }
}
