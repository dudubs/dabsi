import SystemRpc from "@dabsi/system/core/common/rpc";
import { RpcNamespace } from "@dabsi/typerpc";

@SystemRpc.register("admin")
export default class AdminRpc extends RpcNamespace {}
