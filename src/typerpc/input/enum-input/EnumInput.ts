import { NoRpc } from "../../NoRpc";
import { Input } from "../Input";
import { NullableInput } from "../nullable-input/NullableInput";
import { ValueOrAwaitableFn } from "../ValueOrAwaitableFn";
import { EnumInputHandler } from "./EnumInputHandler";

export type EnumInput<K extends string, N extends boolean> = NullableInput<
  N,
  {
    Controller: NoRpc;

    Commands: {};

    ValueData: K;

    Value: K;

    ValueElement: K;

    Props: { keys: Set<K> };

    Config: undefined | { default?: ValueOrAwaitableFn<K> };

    Element: { default?: K };

    Error: "INVALID_ENUM_KEY";
  }
>;

export type AnyEnumInput = EnumInput<string, boolean>;

export function EnumInput<K extends string, N extends boolean = false>(
  keys: K[],
  options?: { nullable?: N }
): EnumInput<K, N> {
  return <any>Input<AnyEnumInput>({
    handler: EnumInputHandler,
    props: {
      nullable: options?.nullable ?? false,
      keys: new Set(keys),
    },

    getValueDataFromElement(value) {
      return value;
    },
  });
}

export const GenderInput = EnumInput(["male", "female"]);
