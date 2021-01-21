import { Awaitable } from "@dabsi/common/typings2/Async";
import { InputError, TInput } from "@dabsi/typerpc/input/Input";
import {
  AbstractInputView,
  InputViewProps,
} from "@dabsi/typerpc/input/InputView";
import { NullableInput } from "@dabsi/typerpc/input/nullable-input/NullableInput";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { ReactElement } from "react";

export class NullableInputView<
  C extends RpcConnection<NullableInput<any, TInput>>
> extends AbstractInputView<
  C,
  InputViewProps<C> & {
    children(view: NullableInputView<C>): ReactElement;
  }
> {
  protected getError(): Awaitable<InputError<C> | undefined> {
    if (!this.connection.$widget.nullable) {
      if (this.value == null) {
        return "NOT_NULLABLE";
      }
    }
  }

  renderView(): React.ReactNode {
    return this.props.children(this);
  }
}

// TOOD: InputView
