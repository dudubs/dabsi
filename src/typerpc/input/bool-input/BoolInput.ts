import { NoRpc } from "../../NoRpc";
import { Input } from "../Input";
import { ValueOrAwaitableFn } from "../ValueOrAwaitableFn";
import { BoolInputHandler } from "./BoolInputHandler";

export type BoolInput = Input<{
  Commands: {};
  ValueData: boolean;
  Value: boolean;
  ValueElement: boolean;
  Config:
    | {
        default?: ValueOrAwaitableFn<boolean>;
      }
    | undefined;
  Props: {};
  Element: {};
  Error: undefined;
  Controller: NoRpc;
}>;

export function BoolInput(): BoolInput {
  return Input({
    handler: BoolInputHandler,
    getValueData(value) {
      return value;
    },
  });
}
