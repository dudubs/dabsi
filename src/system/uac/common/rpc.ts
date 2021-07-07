import SystemRpc from "@dabsi/system/core/common/rpc";
import { Rpc, RpcContextual, RpcFuncational } from "@dabsi/typerpc";
import { UacCurrentUser } from "./UacCurrentUser";
import { UacLoginForm } from "./UacLoginForm";

export class UacRpc extends Rpc {
  static instance = SystemRpc.register("acl", UacRpc);

  @RpcContextual(() => UacLoginForm) loginForm!: UacLoginForm;

  @RpcFuncational() getCurrentUser!: () => Promise<UacCurrentUser | null>;

  @RpcFuncational() logout!: () => Promise<void>;
}
