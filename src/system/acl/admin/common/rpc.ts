import { ACL_Admin_GroupsRpc } from "@dabsi/system/acl/admin/common/groupsRpc";
import { ACL_Admin_UsersRpc } from "@dabsi/system/acl/admin/common/usersRpc";

import { AdminRpc } from "@dabsi/system/admin/common";
import { RpcMap } from "@dabsi/old-typerpc/rpc-map/RpcMap";

export const [ACL_AdminRpc, ACL_Admin_Connection] = AdminRpc.register(
  "acl",
  RpcMap({
    groups: ACL_Admin_GroupsRpc,
    users: ACL_Admin_UsersRpc,
  })
);
