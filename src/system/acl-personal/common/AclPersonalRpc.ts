import { AclUserBasicForm } from "@dabsi/system/acl/admin/common/AclRpc";
import SystemRpc from "@dabsi/system/core/common/rpc";
import { Rpc, RpcContextual } from "@dabsi/typerpc";

// class AclUserBasic
export default class AclPersonalRpc extends Rpc {
  static instance = SystemRpc.register("personal", AclPersonalRpc);

  @RpcContextual()
  basicInfoForm!: AclUserBasicForm;
}
