import { If } from "@dabsi/common/typings2/boolean";
import { NoRpc } from "@dabsi/typerpc/NoRpc";
import { Input } from "@dabsi/typerpc/input/Input";
import { NullableInput } from "@dabsi/typerpc/input/nullable-input/NullableInput";
import { ValueOrAwaitableFn } from "@dabsi/typerpc/input/ValueOrAwaitableFn";
import { EnumInputHandler } from "@dabsi/typerpc/input/enum-input/EnumInputHandler";

export type EnumInput<K extends string, N extends boolean> = NullableInput<
  N,
  {
    Controller: {};

    ValueData: K;

    Value: K;

    ValueElement: K;

    ValueConfig: K | undefined;

    Props: { keys: Set<K> };

    Config: undefined;

    Element: {};

    Error: "INVALID_ENUM_KEY";
  }
>;

export type AnyEnumInput = EnumInput<string, boolean>;

export function EnumInput<K extends string, N extends boolean = false>(
  keys: K[],
  options?: { nullable?: N }
): EnumInput<K, N> {
  return <any>Input<AnyEnumInput>({
    isConfigCanBeUndefined: true,
    type: EnumInput,
    handler: EnumInputHandler,
    props: {
      nullable: options?.nullable ?? false,
      keys: new Set(keys),
    },

    getValueDataFromValueElement(value) {
      return value;
    },
  });
}

export const GenderInput = EnumInput(["male", "female"]);
