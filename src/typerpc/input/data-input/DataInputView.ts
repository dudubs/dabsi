import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { NullableInputView } from "@dabsi/typerpc/input/nullable-input/NullableInputView";
import { AnyDataInput } from "@dabsi/typerpc/input/data-input/rpc";

export class DataInputView<
  C extends RpcConnection<AnyDataInput>
> extends NullableInputView<C> {}
