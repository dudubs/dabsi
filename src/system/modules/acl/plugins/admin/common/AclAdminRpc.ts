import AclGroupsManager from "@dabsi/system/modules/acl/plugins/admin/groups/common/AclGroupsManager";
import AclUsersManager from "@dabsi/system/modules/acl/plugins/admin/users/common/AclUsersManager";
import { AdminRpc } from "@dabsi/system/modules/admin/common";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";

export const [AclAdminRpc, AclAdminConnection] = AdminRpc.register(
  "acl",
  RpcMap({
    groupsManager: AclGroupsManager,
    usersManager: AclUsersManager,
  })
);
