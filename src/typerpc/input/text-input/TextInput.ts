import { Override } from "../../../common/typings";
import { NoRpc } from "../../NoRpc";
import { Input } from "../Input";
import { TextInputError, TextInputOptions } from "./TextInputLoader";
import { ValueOrAwaitableFn } from "../ValueOrAwaitableFn";
import { TextInputHandler } from "./TextInputHandler";

export type TextInput = Input<{
  Error: TextInputError;

  ValueData: string;

  Commands: {};

  Value: string;

  ValueElement: string;

  Controller: NoRpc;

  Props: {};

  Config:
    | undefined
    | (TextInputOptions & {
        default?: ValueOrAwaitableFn<string | undefined>;
      });

  Element: Override<
    TextInputOptions,
    {
      pattern?: string;
    }
  >;
}>;

export function TextInput(): TextInput {
  return Input<TextInput>({
    handler: TextInputHandler,
    getValueDataFromElement(value) {
      return value;
    },
  });
}
