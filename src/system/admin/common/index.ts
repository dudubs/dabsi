import Router from "@dabsi/typerouter/router";
import { RpcFn } from "@dabsi/old-typerpc/rpc-fn/RpcFn";
import { RpcNamespace } from "@dabsi/old-typerpc/namespace/rpc";
import { SystemRouter } from "@dabsi/system/core/view/SystemRouter";
import { SystemRpc } from "@dabsi/system/core/common/rpc";

export const AdminRouter = Router({});
// move to view
SystemRouter.register("admin", AdminRouter);

export const [AdminInfoRpc, getAdminInfo] = SystemRpc.register(
  "admin-info",
  RpcFn<() => AdminInfo>()
);

export const [AdminRpc, AdminConnection] = SystemRpc.register(
  "admin",
  RpcNamespace()
);

export type AdminInfo =
  | { type: "fail" }
  | { type: "success"; tokens: string[] };
