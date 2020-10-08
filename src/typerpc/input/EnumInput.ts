import { NoRpc } from "../NoRpc";
import { EnumInputContext } from "./EnumInputContext";
import { Input } from "./Input";
import { NullableInput } from "./NullableInput";
import { ValueOrAwaitableFn } from "./ValueOrAwaitableFn";

/*

    NullableInput()

 */

export type EnumInput<K extends string, N extends boolean> = NullableInput<
  N,
  {
    Controller: NoRpc;

    Data: K;

    Value: K;

    ValueElement: K;

    Props: { keys: Set<K> };

    Config: undefined | { default?: ValueOrAwaitableFn<K> };

    Element: { default?: K };

    Error: "INVALID";
  }
>;

export function EnumInput<K extends string, N extends boolean = false>(
  keys: K[],
  options?: { nullable?: N }
): EnumInput<K, N> {
  return <any>Input<EnumInput<any, any>>({
    props: {
      nullable: options?.nullable ?? false,
      keys: new Set(keys),
    },
    context: EnumInputContext,
    getValueElementFromElement(element) {
      return element.default;
    },
    getDataFromValueElement(value) {
      return value;
    },
  });
}

export const GenderInput = EnumInput(["male", "female"]);
