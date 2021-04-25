import { NoRpc } from "@dabsi/old-typerpc/NoRpc";
import { Input } from "@dabsi/old-typerpc/input/Input";
import { ValueOrAwaitableFn } from "@dabsi/old-typerpc/input/ValueOrAwaitableFn";
import { BoolInputHandler } from "@dabsi/old-typerpc/input/bool-input/BoolInputHandler";

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
    getValueDataFromValueElement(value) {
      return value;
    },
  });
}
