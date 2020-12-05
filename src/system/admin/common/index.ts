import { Router } from "../../../typerouter/Router";
import { RpcFn } from "../../../typerpc/rpc-fn/RpcFn";
import { RpcNamespace } from "../../../typerpc/RpcNamespace";
import { SystemRouter } from "../../core/common/SystemRouter";
import { SystemRpc } from "../../core/common/SystemRpc";

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
