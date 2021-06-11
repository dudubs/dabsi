import { Payload } from "@dabsi/common/typings2/Payload";
import SystemRpc from "@dabsi/system/core/common/rpc";
import { Rpc, RpcContextual, RpcFuncational } from "@dabsi/typerpc2";
import { AclLoginForm } from "./AclLoginForm";

export type AclCurrentUser = {
  loginName: string;
  fullName?: string;
};

export class AclRpc extends Rpc {
  static instance = SystemRpc.register("acl", AclRpc);

  @RpcContextual(() => AclLoginForm) login!: AclLoginForm;

  @RpcFuncational() getCurrentUser!: () => Promise<AclCurrentUser | null>;

  @RpcFuncational() logout!: () => Promise<void>;
}
