import { NoRpc } from "../../NoRpc";
import { Input } from "../Input";
import { ValueOrAwaitableFn } from "../ValueOrAwaitableFn";
import { BoolInputHandler } from "./BoolInputHandler";

export type BoolInput = Input<{
  Commands: {};
  ValueData: boolean;
  Value: boolean;
  ValueElement: boolean;
  ValueConfig: boolean | undefined;
  Config: undefined;
  Props: {};
  Element: {};
  Controller: {};
  Children: {};
  Error: undefined;
}>;

export function BoolInput(): BoolInput {
  return Input({
    handler: BoolInputHandler,
    getValueDataFromElement(value) {
      return value;
    },
  });
}
