import { RpcConnection } from "../../Rpc";
import { NullableInputView } from "../nullable-input/NullableInputView";
import { AnyDataInput } from "./DataInput";

export class DataInputView<
  C extends RpcConnection<AnyDataInput>
> extends NullableInputView<C> {}
