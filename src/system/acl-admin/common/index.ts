import { AclUsersManager } from "../../../system-old/common/AclUsersManager";
import { Router } from "../../../typerouter/Router";
import { DataManagerRouter } from "../../../typerpc/data-manager/DataManagerRouter";
import { Rpc } from "../../../typerpc/Rpc";
import { RpcMap } from "../../../typerpc/rpc-map/RpcMap";
import { AdminRouter, AdminRpc } from "../../admin/common";

export const AclAdminRpc = RpcMap({
  users: AclUsersManager,
});

export const AclAdminConnection = AdminRpc.register("acl", AclAdminRpc);
export const AclAdminRouter = Router({
  users: DataManagerRouter(AclUsersManager),
});

AdminRouter.register("acl", AclAdminRouter);
