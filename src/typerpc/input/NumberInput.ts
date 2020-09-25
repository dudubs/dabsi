import { NoRpc } from "../NoRpc";
import { Input } from "./Input";
import { NumberInputContext } from "./NumberInputContext";
import { NumberSchema, NumberSchemaError } from "./NumberSchema";

export type NumberInput = Input<{
  Controller: NoRpc;

  Data: number;

  Value: number;

  ValueElement: number;

  Props: {};

  Config:
    | undefined
    | (NumberSchema & {
        default?: number;
      });

  Element: NumberSchema & { default?: number };

  Error: NumberSchemaError;
}>;

export function NumberInput(): NumberInput {
  return <any>Input<NumberInput>({
    context: NumberInputContext,
    getDataFromElement: (element) => element.default ?? element.min ?? 0,
    getValueElementFromElement: (element) =>
      element.default ?? element.min ?? 0,
  });
}
