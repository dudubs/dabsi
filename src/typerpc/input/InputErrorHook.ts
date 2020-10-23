import { ReactElement } from "react";
import { Awaitable } from "../../common/typings";
import { RpcConnection } from "../Rpc";
import { AbstractInputView } from "./AbstractInputView";
import { AnyInput, Input, InputError, InputType } from "./Input";
import { InputView, InputViewProps } from "./InputView";

export type AnyInputErrorHook = InputErrorHook<AnyInput, any>;

export type InputErrorHook<T extends AnyInput, E> = Input<
  Omit<InputType<T>, "Error"> & {
    TErrorHook: {
      Target: T;
      Error: E;
      TargetError: InputError<T>;
    };
    Error: InputError<T> | E;
  }
>;

export function InputErrorHook<E>() {
  return <T extends AnyInput>(input: T): InputErrorHook<T, E> => {
    return <any>input;
  };
}

export function InputErrorHookViewProps<
  C extends RpcConnection<AnyInputErrorHook>,
  T extends AnyInput = InputType<C>["TErrorHook"]["Target"]
>(props: InputViewProps<C>): InputViewProps<RpcConnection<T>> {
  return <any>props;
}

export class InputErrorHookView<
  C extends RpcConnection<InputErrorHook<AnyInput, any>>,
  Target extends AnyInput = InputType<C>["TErrorHook"]["Target"]
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
        inputRef: (target) => {
          this.target = target;
        },
      },
      this.errorElement
    );
  }
}
