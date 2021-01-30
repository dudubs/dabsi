import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import { AclContext } from "@dabsi/system/acl/context";
import { Group } from "@dabsi/system/acl/entities/Group";
import AclAdminGroupUsersTable from "@dabsi/system/acl/plugins/admin/groups/common/AclAdminGroupUsersTable";
import { DataRow } from "@dabsi/typedata/row";

export default RpcConfigResolver(
  AclAdminGroupUsersTable,
  { group: DataRow(Group), acl: AclContext },
  c => $ => {
    return $({
      searchIn: ["firstName", "lastName", "loginName"],
      source: c.acl.users.addFields({
        isChecked: { $has: { groups: { $is: c.group.$key } } },
      }),
    });
  }
);
