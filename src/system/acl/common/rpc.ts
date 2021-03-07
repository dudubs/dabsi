import { AclLoginForm } from "./loginForm";
import { SystemRpc } from "@dabsi/system/core/common/rpc";
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
