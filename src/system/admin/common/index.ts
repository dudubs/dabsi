import Router from "@dabsi/typerouter/router";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcNamespace } from "@dabsi/typerpc/namespace/rpc";
import { SystemRouter } from "@dabsi/system/core/common/router";
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
