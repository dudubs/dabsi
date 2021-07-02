import { Override } from "@dabsi/common/typings2/Override";
import { AnyInput, BaseInput, Input } from "@dabsi/typerpc/input/Input";
import { InputWithConfig } from "@dabsi/typerpc/input/InputHandler";
import { RpcType } from "@dabsi/typerpc/Rpc";

export type InputWithCustomError<
  T extends AnyInput,
  CustomError
> = T extends Input<
  infer ValueData,
  infer ValueElement,
  infer Error,
  infer Element
>
  ? Override<
      T,
      BaseInput<ValueData, ValueElement, Error | CustomError, Element>
    >
  : never;

export type InputWithConfigAndCustomError<
  T extends AnyInput,
  CustomError
> = T extends InputWithConfig<
  infer T,
  infer C,
  infer V,
  infer VC,
  infer H,
  infer HC,
  infer CV
>
  ? InputWithCustomError<T, CustomError> &
      InputWithConfig<InputWithCustomError<T, CustomError>, C, V, VC, H, HC, CV>
  : InputWithCustomError<T, CustomError>;

export function InputWithCustomError<CustomError>(): {
  <T extends AnyInput>(inputType: RpcType<T>): RpcType<
    InputWithConfigAndCustomError<T, CustomError>
  >;
} {
  return inputType => <any>inputType;
}

export const InputWithAlreadyInUseError = InputWithCustomError<"ALREADY_IN_USE">();

export type InputWithAnyError<
  T extends AnyInput
> = InputWithConfigAndCustomError<T, any>;
