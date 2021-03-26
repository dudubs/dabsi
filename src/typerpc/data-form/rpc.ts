import { AnyInput } from "@dabsi/typerpc/input/Input";
import { Form } from "@dabsi/typerpc/widget/form/rpc";

export type DataForm<Input extends AnyInput> = Form<{
  Value: string;
  Input: Input;
  Error: never; // RowNotFound?
}>;

const map = new WeakMap();

Object.setPrototypeOf(DataForm, Form);

export function DataForm<Input extends AnyInput>(
  input: Input
): DataForm<Input> {
  return map.touch(input, () => {
    const form = Form({ input });
    form.rpcType = DataForm;
    return form;
  });
}
