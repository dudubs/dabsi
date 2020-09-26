import { NoRpc } from "../NoRpc";
import { BoolInputContext } from "./BoolInputContext";
import { Input } from "./Input";

export type BoolInput = Input<{
  Data: boolean;
  Value: boolean;
  ValueElement: boolean;
  Config:
    | {
        default?: boolean;
      }
    | undefined;
  Props: {};
  Element: { default?: boolean };
  Error: undefined;
  Controller: NoRpc;
}>;

export function BoolInput(): BoolInput {
  return Input({
    context: BoolInputContext,
    getValueElementFromElement: (element) => element.default ?? false,
  });
}
