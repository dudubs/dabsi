import AclAdminGroupsManager from "@dabsi/system/acl/plugins/admin/groups/common/AclAdminGroupsManager";
import AclAdminUsersManager from "@dabsi/system/acl/plugins/admin/users/common/AclAdminUsersManager";
import { AdminRpc } from "@dabsi/system/admin/common";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";

export const [AclAdminRpc, AclAdminConnection] = AdminRpc.register(
  "acl",
  RpcMap({
    groupsManager: AclAdminGroupsManager,
    usersManager: AclAdminUsersManager,
  })
);
