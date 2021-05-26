import { AnyInput } from "@dabsi/old-typerpc/input/Input";
import { Form } from "@dabsi/old-typerpc/widget/form/rpc";

export type OldDataForm<Input extends AnyInput> = Form<{
  Value: string;
  Input: Input;
  Error: never; // RowNotFound?
}>;

const map = new WeakMap();

Object.setPrototypeOf(DataForm, Form);

export function OldDataForm<Input extends AnyInput>(
  input: Input
): DataForm<Input> {
  return Form({ input });
}
