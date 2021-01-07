import AclGroupUsersTable from "@dabsi/system/acl/plugins/admin/groups/common/AclAdminGroupUsersTable";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import { Group } from "@dabsi/system/acl/entities/Group";
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
