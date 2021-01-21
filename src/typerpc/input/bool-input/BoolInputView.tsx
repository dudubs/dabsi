import { BoolInput } from "@dabsi/typerpc/input/bool-input/BoolInput";
import {
  AbstractInputView,
  InputViewProps,
} from "@dabsi/typerpc/input/InputView";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { ReactElement } from "react";

export type BoolInputViewProps<
  C extends RpcConnection<BoolInput>
> = InputViewProps<C> & {
  children(field: BoolInputView<C>): ReactElement;
};

export default class BoolInputView<
  C extends RpcConnection<BoolInput>
> extends AbstractInputView<C, BoolInputViewProps<C>> {
  renderView(): React.ReactNode {
    return this.props.children(this);
  }
}
