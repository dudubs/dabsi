import { ReactElement } from "react";
import { Awaitable } from "../../common/typings2/Async";
import { RpcConnection } from "../Rpc";
import { AbstractInputView } from "./AbstractInputView";
import { AnyInput, Input, InputType } from "./Input";
import { AnyInputErrorHook, TInputErrorHook } from "./InputErrorHook";
import { InputView, InputViewProps } from "./InputView";

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
  target: InputView<RpcConnection<Target>> | null;

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
