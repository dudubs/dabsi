import { ReactElement } from "react";
import { Awaitable } from "../../common/typings";
import { ViewState } from "../../react/view/ViewState";
import { RpcConnection } from "../Rpc";
import { WidgetElement, WidgetType } from "../widget/Widget";
import { BoolInput } from "./BoolInput";
import { AnyInput, InputData, InputError, InputType } from "./Input";
import { InputErrorOrData, InputView, InputViewProps } from "./InputView";

export type BoolInputViewProps<
  C extends RpcConnection<BoolInput>
> = InputViewProps<C> & {
  children(field: BoolInputView<C>): ReactElement;
};

export class BoolInputView<
  C extends RpcConnection<BoolInput>
> extends InputView<C, BoolInputViewProps<C>> {
  renderView(): React.ReactNode {
    return this.props.children(this);
  }
}
