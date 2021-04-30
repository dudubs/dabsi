import SystemRpc from "@dabsi/system/core/common/rpc";
import { Rpc, RpcFuncational } from "@dabsi/typerpc2";

export type AclStats =
  | { type: "guest" }
  | { type: "user"; loginName: string; fullName: string | undefined };

export class AclRpc extends Rpc {
  static instance = SystemRpc.register("acl", AclRpc);

  @RpcFuncational() login!: (
    loginName: string,
    password: string
  ) => Promise<
    { type: "fail" } | { type: "success"; fullName: string | undefined }
  >;

  @RpcFuncational() getStats!: () => Promise<AclStats>;
}
