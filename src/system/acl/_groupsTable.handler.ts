import DataContext from "@dabsi/modules/data/DataContext";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import AclGroupsTable from "@dabsi/system/acl/common/AclGroupsTable";
import { Group } from "@dabsi/system/acl/entities/Group";

export default RpcResolver(AclGroupsTable, $ =>
  $.with({ data: DataContext }).configure(c => $ =>
    $({
      source: c.data.getSource(Group),
      // isSelectedRow: row => row,
      columns: {
        groupName: { field: "name" },
        countUsers: { field: { $count: "users" } },
      },
    })
  )
);
