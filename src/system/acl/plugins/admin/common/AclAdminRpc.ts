import { AclAdminGroupsManager } from "@dabsi/system/acl/plugins/admin/groups/common/manager";
import { AclAdminUsersManager } from "@dabsi/system/acl/plugins/admin/users/common/manager";
import { AdminRpc } from "@dabsi/system/admin/common";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";

export const [AclAdminRpc, AclAdminConnection] = AdminRpc.register(
  "acl",
  RpcMap({
    groupsManager: AclAdminGroupsManager,
    usersManager: AclAdminUsersManager,
  })
);
