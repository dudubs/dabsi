import Router from "@dabsi/typerouter/Router";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcNamespace } from "@dabsi/typerpc/RpcNamespace";
import SystemRouter from "@dabsi/system/core/SystemRouter";
import { SystemRpc } from "@dabsi/system/core/SystemRpc";

export const AdminRouter = Router({});

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
