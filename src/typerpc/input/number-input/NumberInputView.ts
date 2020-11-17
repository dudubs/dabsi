import { ReactNode } from "react";
import { Awaitable } from "../../../common/typings2/Async";
import { RpcConnection } from "../../Rpc";
import { AbstractInputView } from "../AbstractInputView";
import { InputError, InputValueElement } from "../Input";
import { InputView, InputViewProps } from "../InputView";
import { NumberInput } from "./NumberInput";
import { NumberInputLoader, NumberInputOptions } from "./NumberInputLoader";

export class NumberInputView<
  C extends RpcConnection<NumberInput>
> extends AbstractInputView<
  C,
  InputViewProps<C> & {
    children(view: Readonly<NumberInputView<C>>): ReactNode;
  }
> {
  get defaultValue(): number {
    return this.value ?? this.element.minValue ?? 0;
  }

  protected getError(): Awaitable<InputError<C> | undefined> {
    return NumberInputLoader.check(this.element, this.defaultValue);
  }

  async setValue(value: InputValueElement<C>): Promise<void> {
    return super.setValue(NumberInputLoader.load(this.element, value));
  }

  renderView(): React.ReactNode {
    return this.props.children(this);
  }
}
