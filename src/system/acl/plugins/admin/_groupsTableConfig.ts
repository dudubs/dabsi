import { DataContext } from "@dabsi/modules/data/context";
import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { Group } from "@dabsi/system/acl/entities/Group";
import { ACL_Admin_GroupsTable } from "@dabsi/system/acl/plugins/admin/common/groupsTable";

export default RpcConfigResolver(
  // ./BasicInfo
  ACL_Admin_GroupsTable,
  {
    data: DataContext,
  },
  c => $ =>
    $({
      source: c.data.getSource(Group).pick([]),
      columns: {
        countUsers: { field: { $count: "users" } },
        groupName: "name",
      },
    })
);

/*



/*/
