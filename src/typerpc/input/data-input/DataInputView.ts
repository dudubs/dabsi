import { RpcConnection } from "@dabsi/old-typerpc/Rpc";
import { NullableInputView } from "@dabsi/old-typerpc/input/nullable-input/NullableInputView";
import { AnyDataInput } from "@dabsi/old-typerpc/input/data-input/rpc";

export class DataInputView<
  C extends RpcConnection<AnyDataInput>
> extends NullableInputView<C> {}
