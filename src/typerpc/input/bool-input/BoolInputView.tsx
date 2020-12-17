import { ReactElement } from "react";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { ViewState } from "@dabsi/react/view/ViewState";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { WidgetElement, WidgetType } from "@dabsi/typerpc/widget/Widget";
import { AbstractInputView } from "@dabsi/typerpc/input/AbstractInputView";
import { BoolInput } from "@dabsi/typerpc/input/bool-input/BoolInput";
import { AnyInput, InputValueData, InputError, InputType } from "@dabsi/typerpc/input/Input";
import { InputErrorOrData, InputView, InputViewProps } from "@dabsi/typerpc/input/InputView";

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
