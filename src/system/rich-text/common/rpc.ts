import { AnyRpc } from "@dabsi/typerpc/Rpc";
import { RpcNamespace } from "@dabsi/typerpc/namespace/rpc";

export const RichTextRpc = RpcNamespace();
export const RichTextRpcForEditable = new WeakSet<AnyRpc>();
