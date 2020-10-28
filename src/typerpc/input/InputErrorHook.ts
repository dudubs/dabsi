import { ReactElement } from "react";
import { Awaitable } from "../../common/typings";
import { RpcConnection } from "../Rpc";
import { AbstractInputView } from "./AbstractInputView";
import { AnyInput, Input, InputError, InputType } from "./Input";
import { InputView, InputViewProps } from "./InputView";

export type AnyInputErrorHook = InputErrorHook<TInputErrorHook>;

export type TInputErrorHook = { Target: AnyInput; Error: any };
export type InputErrorHook<T extends TInputErrorHook> = Input<
  Omit<InputType<T["Target"]>, "Error"> & {
    TInputErrorHook: T;
    Error: InputError<T["Target"]> | T["Error"];
  }
>;

export function InputErrorHook<E>() {
  return <T extends AnyInput>(
    input: T
  ): InputErrorHook<{ Target: T; Error: E }> => {
    return <any>input;
  };
}

export function InputErrorHookViewProps<
  C extends RpcConnection<AnyInputErrorHook>,
  T extends TInputErrorHook = InputType<C>["TInputErrorHook"]
  // T extends AnyInput = InputType<C>["TErrorHook"]["Target"]
>(props: InputViewProps<C>): InputViewProps<RpcConnection<T["Target"]>> {
  return <any>props;
}

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
    const { connection, element } = this.props;

    return this.props.children(
      {
        connection,
        element,
        inputRef: target => {
          this.target = target;
        },
        value: this.value,
      },
      this.errorElement
    );
  }
}
