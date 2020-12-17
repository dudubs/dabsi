import AclGroupsManager from "@dabsi/system/acl-admin/groups/AclGroupsManager";
import AclUsersManager from "@dabsi/system/acl-admin/users/AclUsersManager";
import { AdminRpc } from "@dabsi/system/admin/common";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";

export const [AclAdminRpc, AclAdminConnection] = AdminRpc.register(
  "acl",
  RpcMap({
    groupsManager: AclGroupsManager,
    usersManager: AclUsersManager,
  })
);
