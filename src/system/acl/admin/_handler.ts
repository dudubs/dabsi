import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { DataSourceFactory2 } from "@dabsi/modules2/DataSourceFactory2";
import ACL_AdminRpc from "@dabsi/system/acl/admin/common/rpc";
import { Group } from "@dabsi/system/acl/entities/Group";
import { Resolver } from "@dabsi/typedi";

export default RpcResolver(ACL_AdminRpc, {
  groupsTable: Resolver(
    {
      getSource: DataSourceFactory2,
    },
    c => $ =>
      $({
        source: c.getSource(Group),
        columns: {
          groupName: { field: "name" },
          countUsers: { field: { $count: "users" } },
        },
      })
  ),
});
