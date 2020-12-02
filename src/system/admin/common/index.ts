import { Router } from "../../../typerouter/Router";
import { RpcFn } from "../../../typerpc/rpc-fn/RpcFn";
import { RpcNamespace } from "../../../typerpc/RpcNamespace";
import { SystemRouter } from "../../core/common/SystemRouter";
import { SystemRpc } from "../../core/common/SystemRpc";

export const AdminRouter = Router({});

SystemRouter.register("admin", AdminRouter);

export const AdminRpc = RpcNamespace();

export const AdminInfoRpc = RpcFn<() => AdminInfo>();

export const getAdminInfo = SystemRpc.register("admin-info", AdminInfoRpc);

export const AdminConnection = SystemRpc.register("admin", AdminRpc);

export type AdminInfo =
  | { type: "fail" }
  | { type: "success"; tokens: string[] };
