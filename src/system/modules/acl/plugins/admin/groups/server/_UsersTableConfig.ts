import AclGroupUsersTable from "@dabsi/system/modules/acl/plugins/admin/groups/common/AclGroupUsersTable";
import AclDataSources from "@dabsi/system/modules/acl/AclDataSources";
import { Group } from "@dabsi/system/modules/acl/entities/Group";
import { DataRow } from "@dabsi/typedata/DataRow";
import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";

export default RpcConfigResolver(
  AclGroupUsersTable,
  { group: DataRow(Group), sources: AclDataSources },
  c => $ => {
    return $({
      searchIn: ["firstName", "lastName", "loginName"],
      source: c.sources.users.addFields({
        isChecked: { $has: { groups: { $is: c.group.$key } } },
      }),
    });
  }
);
