import { ACL_Admin_GroupsRpc } from "@dabsi/system/acl/plugins/admin/common/groupsRpc";

import { AdminRpc } from "@dabsi/system/admin/common";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";

export const [ACL_Admin_Rpc, ACL_Admin_Connection] = AdminRpc.register(
  "acl",
  RpcMap({
    groups: ACL_Admin_GroupsRpc,
  })
);
