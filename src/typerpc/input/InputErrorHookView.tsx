import { Awaitable } from "@dabsi/common/typings2/Async";
import { AnyInput, InputType } from "@dabsi/typerpc/input/Input";
import {
  AnyInputErrorHook,
  TInputErrorHook,
} from "@dabsi/typerpc/input/InputErrorHook";
import {
  AbstractInputView,
  InputViewInstance,
  InputView,
  InputViewProps,
} from "@dabsi/typerpc/input/InputView";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { ReactElement } from "react";

export class InputErrorHookView<
  C extends RpcConnection<AnyInputErrorHook>,
  T extends TInputErrorHook = InputType<C>["TInputErrorHook"],
  Target extends AnyInput = T["Target"]
> extends AbstractInputView<
  C,
  InputViewProps<C> & {
    children(
      props: InputViewProps<RpcConnection<Target>>,
      error: ReactElement | undefined
    ): ReactElement;
  }
> {
  target: InputViewInstance<RpcConnection<Target>> | null = null;

  inputWillValidate(): Awaitable {
    return this.target?.validate();
  }

  protected updateError(error: InputType<C>["Error"] | undefined) {
    if (!this.errorElement) {
      this.target?.setError(error);
    }
  }

  renderView(): React.ReactNode {
    const {
      connection,
      element,
      elementState,
      onElementStateChange,
    } = this.props;

    return this.props.children(
      {
        connection,
        element,
        elementState,
        onElementStateChange,
        inputRef: target => {
          this.target = target;
        },
        value: this.value,
      },
      this.errorElement
    );
  }
}
