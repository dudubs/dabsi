import { UacUserBasicForm } from "@dabsi/system/uac/admin/common/UacRpc";
import SystemRpc from "@dabsi/system/core/common/rpc";
import { Rpc, RpcContextual } from "@dabsi/typerpc";

// class UacUserBasic
export default class UacPersonalRpc extends Rpc {
  static instance = SystemRpc.register("personal", UacPersonalRpc);

  @RpcContextual()
  basicInfoForm!: UacUserBasicForm;
}
