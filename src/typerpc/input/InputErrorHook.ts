import { RpcConnection } from "../Rpc";
import { AnyInput, Input, InputError, InputType } from "./Input";
import { InputViewProps } from "./InputView";

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
