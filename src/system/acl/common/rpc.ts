import SystemRpc from "@dabsi/system/core/common/rpc";
import { Rpc, RpcContextual, RpcFuncational } from "@dabsi/typerpc";
import { AclCurrentUser } from "./AclCurrentUser";
import { AclLoginForm } from "./AclLoginForm";

export class AclRpc extends Rpc {
  static instance = SystemRpc.register("acl", AclRpc);

  @RpcContextual(() => AclLoginForm) loginForm!: AclLoginForm;

  @RpcFuncational() getCurrentUser!: () => Promise<AclCurrentUser | null>;

  @RpcFuncational() logout!: () => Promise<void>;
}
