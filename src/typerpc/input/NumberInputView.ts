import { ReactNode } from "react";
import { Awaitable } from "../../common/typings";
import { RpcConnection } from "../Rpc";
import { AbstractInputView } from "./AbstractInputView";
import { InputError, InputValueElement } from "./Input";
import { InputView, InputViewProps } from "./InputView";
import { NumberInput } from "./NumberInput";
import { NumberSchema } from "./NumberSchema";

export class NumberInputView<
  C extends RpcConnection<NumberInput>
> extends AbstractInputView<
  C,
  InputViewProps<C> & {
    children(view: Readonly<NumberInputView<C>>): ReactNode;
  }
> {
  protected getError(): Awaitable<InputError<C> | undefined> {
    return NumberSchema.check(this.element, this.value);
  }

  async setValue(value: InputValueElement<C>): Promise<void> {
    return super.setValue(NumberSchema.get(this.element, value));
  }

  renderView(): React.ReactNode {
    return this.props.children(this);
  }
}
