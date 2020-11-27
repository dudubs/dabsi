import { RpcFn } from "../../../typerpc/rpc-fn/RpcFn";
import { RpcMap } from "../../../typerpc/rpc-map/RpcMap";
import { SystemRpc } from "../../core/common/SystemRpc";

export type LoginInfo =
  | {
      type: "success";
      fullName: string;
    }
  | { type: "fail" };

export const AclRpc = RpcMap({
  login: RpcFn<(loginName: string, password: string) => LoginInfo>(),
  getLogin: RpcFn<() => LoginInfo>(),
});

//
export const AclConnection = SystemRpc.register("acl", AclRpc);

// AdminRpcConfigResolver(AclRpc, { token: "" }, )

// Admin
