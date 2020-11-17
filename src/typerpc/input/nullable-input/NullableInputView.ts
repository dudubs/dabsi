import { ReactElement } from "react";
import { Awaitable } from "../../../common/typings2/Async";
import { RpcConnection } from "../../Rpc";
import { AbstractInputView } from "../AbstractInputView";
import { InputError, TInput } from "../Input";
import { InputViewProps } from "../InputView";
import { NullableInput } from "./NullableInput";
import { AnyDataInput } from "../data-input/DataInput";

export class NullableInputView<
  C extends RpcConnection<NullableInput<any, TInput>>
> extends AbstractInputView<
  C,
  InputViewProps<C> & {
    children(view: NullableInputView<C>): ReactElement;
  }
> {
  protected getError(): Awaitable<InputError<C> | undefined> {
    if (!this.rpc.nullable) {
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
