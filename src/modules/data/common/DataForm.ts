// export function DataForm<>

import { Form } from "@dabsi/typerpc2/form/rpc";
import { AnyInput } from "@dabsi/typerpc2/input/Input";
import { RpcType } from "@dabsi/typerpc2/Rpc";

export type DataForm<T extends AnyInput> = Form<T, string>;

const map = new WeakMap();
export function DataForm<T extends AnyInput>(
  inputType: RpcType<T>
): RpcType<DataForm<T>> {
  return map.touch(inputType, () => Form<T, string>(inputType));
}

export default DataForm;
