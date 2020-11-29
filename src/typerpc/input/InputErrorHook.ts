import { Awaitable } from "../../common/typings2/Async";
import { PartialUndefinedKeys } from "../../common/typings2/PartialUndefinedKeys";
import { RpcConnection, RpcUnresolvedConfig } from "../Rpc";
import { RpcHook } from "../RpcHook";
import { AnyInput, Input, InputType, InputValue, TInput } from "./Input";
import { InputErrorHookHandler } from "./InputErrorHookHandler";
import { InputViewProps } from "./InputView";

export type AnyInputErrorHook = InputErrorHook<TInputErrorHook>;

export type TInputErrorHook = { Target: AnyInput; Error: any };

export type InputErrorHook<
  T extends TInputErrorHook,
  TTarget extends TInput = InputType<T["Target"]>
> = Input<
  Omit<TTarget, "Error"> & {
    TInputErrorHook: T;
    Error: TTarget["Error"] | T["Error"];

    Config:
      | TTarget["Config"]
      | PartialUndefinedKeys<
          { $config: RpcUnresolvedConfig<T["Target"]> },
          {
            $check: (
              value: InputValue<T["Target"]>
            ) => Awaitable<T["Error"] | undefined>;
          }
        >;
  }
>;

export function InputErrorHook<E>() {
  return <T extends AnyInput>(
    input: T
  ): InputErrorHook<{ Target: T; Error: E }> => {
    return RpcHook<AnyInput>(input, InputErrorHookHandler);
  };
}

export function InputErrorHookViewProps<
  C extends RpcConnection<AnyInputErrorHook>,
  T extends TInputErrorHook = InputType<C>["TInputErrorHook"]
>(props: InputViewProps<C>): InputViewProps<RpcConnection<T["Target"]>> {
  return <any>props;
}
