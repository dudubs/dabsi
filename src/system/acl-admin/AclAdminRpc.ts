import { RpcMap } from "../../typerpc/rpc-map/RpcMap";
import { AdminRpc } from "../admin/common";
import AclGroupsManager from "./groups/AclGroupsManager";
import AclUsersManager from "./users/AclUsersManager";

export const [AclAdminRpc, AclAdminConnection] = AdminRpc.register(
  "acl",
  RpcMap({
    groupsManager: AclGroupsManager,
    usersManager: AclUsersManager,
  })
);

export default AclAdminRpc;
