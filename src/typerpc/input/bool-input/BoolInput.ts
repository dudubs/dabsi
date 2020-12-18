import { NoRpc } from "@dabsi/typerpc/NoRpc";
import { Input } from "@dabsi/typerpc/input/Input";
import { ValueOrAwaitableFn } from "@dabsi/typerpc/input/ValueOrAwaitableFn";
import { BoolInputHandler } from "@dabsi/typerpc/input/bool-input/BoolInputHandler";

export type BoolInput = Input<{
  ValueData: boolean;
  Value: boolean;
  ValueElement: boolean;
  ValueConfig: boolean | undefined;
  Config: undefined;
  Props: {};
  Element: {};
  Controller: {};
  Error: undefined;
}>;

export function BoolInput(): BoolInput {
  return Input({
    handler: BoolInputHandler,
    type: BoolInput,
    isConfigCanBeUndefined: true,
    getValueDataFromElement(value) {
      return value;
    },
  });
}
