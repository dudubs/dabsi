import { BoolInput } from "@dabsi/old-typerpc/input/bool-input/BoolInput";
import {
  AbstractInputView,
  InputViewProps,
} from "@dabsi/old-typerpc/input/InputView";
import { RpcConnection } from "@dabsi/old-typerpc/Rpc";
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
