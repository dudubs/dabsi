import { DataContext } from "@dabsi/modules/data/context";
import { DataRowContext } from "@dabsi/modules/data/rowContext";
import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { Group } from "@dabsi/system/acl/entities/Group";
import { User } from "@dabsi/system/acl/entities/User";
import { ACL_Admin_GroupsTable } from "@dabsi/system/acl/plugins/admin/common/groupsTable";
import { ACL_Admin_UsersTable } from "@dabsi/system/acl/plugins/admin/common/usersTable";

export default [
  RpcConfigResolver(
    ACL_Admin_GroupsTable,
    { data: DataContext, user: DataRowContext(User) },
    c => $ =>
      $({
        source: c.data.getSource(Group).pick(
          ["name"],
          c.user.$key
            ? {
                checked: { $has: { users: { $is: c.user.$key } } },
              }
            : ({} as { checked })
        ),
        columns: {
          groupName: { field: "name" },
          countUsers: { field: { $count: "users" } },
        },
        loadIsChecked: c.user.$key ? row => Boolean(row.checked) : undefined,
      })
  ),
  RpcConfigResolver(
    ACL_Admin_UsersTable,
    { data: DataContext, group: DataRowContext(Group) },
    c => $ =>
      $({
        source: c.data.getSource(User).pick(
          ["firstName", "lastName", "loginName"],
          c.group.$key
            ? {
                checked: { $has: { groups: { $is: c.group.$key } } },
              }
            : {}
        ),
        loadIsChecked: c.group.$key ? row => Boolean(row.checked) : undefined,
      })
  ),
];
