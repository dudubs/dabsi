import { AnyRpc } from "@dabsi/old-typerpc/Rpc";
import { RpcNamespace } from "@dabsi/old-typerpc/namespace/rpc";

export const RichTextRpc = RpcNamespace();
export const RichTextRpcForEditable = new WeakSet<AnyRpc>();
