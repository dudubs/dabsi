import { NoRpc } from "@dabsi/old-typerpc/NoRpc";
import { Input } from "@dabsi/old-typerpc/input/Input";
import { ValueOrAwaitableFn } from "@dabsi/old-typerpc/input/ValueOrAwaitableFn";
import { NumberInputHandler } from "@dabsi/old-typerpc/input/number-input/NumberInputHandler";
import {
  NumberInputError,
  NumberInputOptions,
} from "@dabsi/old-typerpc/input/number-input/NumberInputLoader";

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
    type: NumberInput,
    isConfigCanBeUndefined: true,
    getValueDataFromValueElement(value) {
      return value;
    },
  });
}
