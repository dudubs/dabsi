import { Awaitable } from "@dabsi/common/typings2/Async";
import { InputError, InputValueElement } from "@dabsi/old-typerpc/input/Input";
import {
  AbstractInputView,
  InputViewProps,
} from "@dabsi/old-typerpc/input/InputView";
import { NumberInput } from "@dabsi/old-typerpc/input/number-input/NumberInput";
import { NumberInputLoader } from "@dabsi/old-typerpc/input/number-input/NumberInputLoader";
import { RpcConnection } from "@dabsi/old-typerpc/Rpc";
import { ReactNode } from "react";

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
