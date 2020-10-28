import { NoRpc } from "../../NoRpc";
import { Input } from "../Input";
import { ValueOrAwaitableFn } from "../ValueOrAwaitableFn";
import { NumberInputHandler } from "./NumberInputHandler";
import { NumberInputError, NumberInputOptions } from "./NumberInputLoader";

export type NumberInput = Input<{
  Controller: NoRpc;

  ValueData: number;

  Commands: {};

  Value: number;

  ValueElement: number;

  Props: {};

  Config:
    | undefined
    | (NumberInputOptions & {
        default?: ValueOrAwaitableFn<number>;
      });

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
