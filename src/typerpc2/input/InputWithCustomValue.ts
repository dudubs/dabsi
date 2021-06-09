import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { AnyInput } from "@dabsi/typerpc2/input/Input";
import {
  inputBaseConfig,
  InputWithConfig,
  OverrideInputCustomValue,
} from "@dabsi/typerpc2/input/InputHandler";
import { RpcType } from "@dabsi/typerpc2/Rpc";
import { TextInput } from "@dabsi/typerpc2/text-input/rpc";

export type InputWithCustomValue<
  T extends AnyInput,
  CustomValue
> = T extends InputWithConfig<
  infer T,
  infer C,
  infer V,
  infer VC,
  infer H,
  infer HC
>
  ? OverrideInputCustomValue<T, CustomValue> &
      InputWithConfig<
        //
        OverrideInputCustomValue<T, CustomValue>,
        C,
        V,
        VC,
        H,
        HC
      >
  : OverrideInputCustomValue<T, CustomValue>;

export function InputWithCustomValue<CustomValue>(): <T extends AnyInput>(
  inputType: RpcType<T>
) => RpcType<InputWithCustomValue<T, CustomValue>> {
  return inputType => <any>inputType;
}

class X extends InputWithCustomValue<{ text: string; length: number }>()(
  TextInput
) {}

createRpcHandler(X, $ =>
  $({
    [inputBaseConfig]: {
      load(text) {
        return { value: { text, length: text.length } };
      },
    },
  })
);
