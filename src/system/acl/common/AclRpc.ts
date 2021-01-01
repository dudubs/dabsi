import AclLoginForm from "@dabsi/system/acl/common/AclLoginForm";
import { SystemRpc } from "@dabsi/system/rpc/SystemRpc";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";

export type AclLoginInfo =
  | {
      type: "success";
      fullName: string;
    }
  | { type: "fail" };

export const [AclRpc, AclConnection] = SystemRpc.register(
  "acl",
  RpcMap({
    login: AclLoginForm,
    logout: RpcFn(),
    getLoginInfo: RpcFn<() => AclLoginInfo>(),
  })
);
