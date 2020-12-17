import { NoRpc } from "@dabsi/typerpc/NoRpc";
import { Input } from "@dabsi/typerpc/input/Input";
import { ValueOrAwaitableFn } from "@dabsi/typerpc/input/ValueOrAwaitableFn";
import { NumberInputHandler } from "@dabsi/typerpc/input/number-input/NumberInputHandler";
import { NumberInputError, NumberInputOptions } from "@dabsi/typerpc/input/number-input/NumberInputLoader";

export type NumberInput = Input<{
  Controller: {};

  ValueData: number;

  Value: number;

  ValueElement: number;

  ValueConfig: number | undefined;

  Props: {};

  Config: undefined | NumberInputOptions;

  Element: NumberInputOptions;

  Error: NumberInputError;
}>;

export function NumberInput(): NumberInput {
  return <any>Input<NumberInput>({
    handler: NumberInputHandler,

    getValueDataFromElement(value) {
      return value;
    },
  });
}
