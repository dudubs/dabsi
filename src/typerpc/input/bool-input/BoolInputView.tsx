import { ReactElement } from "react";
import { Awaitable } from "../../../common/typings";
import { ViewState } from "../../../react/view/ViewState";
import { RpcConnection } from "../../Rpc";
import { WidgetElement, WidgetType } from "../../widget/Widget";
import { AbstractInputView } from "../AbstractInputView";
import { BoolInput } from "./BoolInput";
import { AnyInput, InputValueData, InputError, InputType } from "../Input";
import { InputErrorOrData, InputView, InputViewProps } from "../InputView";

export type BoolInputViewProps<
  C extends RpcConnection<BoolInput>
> = InputViewProps<C> & {
  children(field: BoolInputView<C>): ReactElement;
};

export class BoolInputView<
  C extends RpcConnection<BoolInput>
> extends AbstractInputView<C, BoolInputViewProps<C>> {
  renderView(): React.ReactNode {
    return this.props.children(this);
  }
}