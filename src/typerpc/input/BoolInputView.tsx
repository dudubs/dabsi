import { ReactElement } from "react";
import { Awaitable } from "../../common/typings";
import { ViewState } from "../../react/view/ViewState";
import { RpcConnection } from "../Rpc";
import { WidgetElement, WidgetType } from "../widget/Widget";
import { BoolInput } from "./BoolInput";
import { AnyInput, InputData, InputType } from "./Input";
import { InputErrorOrData, InputView, InputViewProps } from "./InputView";

export type BoolInputViewProps<
  C extends RpcConnection<BoolInput>
> = InputViewProps<C> & {
  children(field: BoolInputView<C>): ReactElement;
};

export class BoolInputView<
  C extends RpcConnection<BoolInput>
> extends InputView<C, BoolInputViewProps<C>> {
  @ViewState() value: boolean;

  freezeElement(): WidgetElement<C> {
    return { ...this.element, default: this.value };
  }

  protected updateElement(element: WidgetElement<BoolInput>) {
    this.value = element.default ?? false;
  }

  renderView(): React.ReactNode {
    return this.props.children(this);
  }

  getValidData(): Awaitable<InputErrorOrData<C>> {
    return { value: this.value };
  }
}
