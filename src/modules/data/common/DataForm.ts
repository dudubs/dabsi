// export function DataForm<>

import { Form } from "@dabsi/typerpc/form/rpc";
import { AnyInput } from "@dabsi/typerpc/input/Input";
import { RpcType } from "@dabsi/typerpc/Rpc";

export type DataForm<T extends AnyInput> = Form<T, string>;

export function DataForm<T extends AnyInput>(
  inputType: RpcType<T>
): RpcType<DataForm<T>> {
  return Form<T, string>(inputType);
}

export default DataForm;
