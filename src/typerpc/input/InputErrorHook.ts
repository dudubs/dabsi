import { ReactElement } from "react";
import { Awaitable } from "../../common/typings";
import { RpcConnection } from "../Rpc";
import { WidgetElement, WidgetType } from "../widget/Widget";
import { AbstractInputView } from "./AbstractInputView";
import { AnyInput, InputError, InputHook, InputType } from "./Input";
import { InputErrorOrData, InputView, InputViewProps } from "./InputView";

export type InputErrorHook<T extends AnyInput, E> = InputHook<
  T,
  {
    ErrorHookTarget: T;

    Error: InputError<T> | E;
  }
>;

export function InputErrorHook<E>() {
  return <T extends AnyInput>(input: T): InputErrorHook<T, E> => {
    return <any>input;
  };
}

export function InputErrorHookViewProps<
  C extends RpcConnection<InputErrorHook<T, any>>,
  T extends AnyInput
>(props: InputViewProps<C>): InputViewProps<RpcConnection<T>> {
  return <any>props;
}

export class InputErrorHookView<
  C extends RpcConnection<InputErrorHook<AnyInput, any>>
> extends AbstractInputView<
  C,
  InputViewProps<C> & {
    children(
      props: InputViewProps<RpcConnection<InputType<C>["ErrorHookTarget"]>>,
      error: ReactElement | undefined
    ): ReactElement;
  }
> {
  target: InputView<RpcConnection<InputType<C>["ErrorHookTarget"]>> | null;

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
