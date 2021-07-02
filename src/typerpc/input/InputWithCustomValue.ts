import { AnyInput } from "@dabsi/typerpc/input/Input";
import { InputWithConfig } from "@dabsi/typerpc/input/InputHandler";
import { RpcType } from "@dabsi/typerpc/Rpc";

export type InputWithCustomValue<
  T extends AnyInput,
  CustomValue
> = T extends InputWithConfig<
  infer T,
  infer C,
  infer V,
  infer VC,
  infer H,
  infer HC,
  infer CV
>
  ? T &
      InputWithConfig<
        //
        T,
        C,
        V,
        VC,
        H,
        HC,
        CustomValue
      >
  : T;

export function InputWithCustomValue<CustomValue = never>(): <
  T extends AnyInput
>(
  inputType: RpcType<T>
) => RpcType<InputWithCustomValue<T, CustomValue>> {
  return inputType => <any>inputType;
}
