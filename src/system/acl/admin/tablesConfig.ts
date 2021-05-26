import { DataRowContext } from "@dabsi/modules/data/DataRowContext";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { Group } from "@dabsi/system/acl/entities/Group";
import { User } from "@dabsi/system/acl/entities/User";
import { ACL_Admin_GroupsTable } from "@dabsi/system/acl/admin/common/groupsTable";
import { ACL_Admin_UsersTable } from "@dabsi/system/acl/admin/common/usersTable";
import { DataSourceFactory2 } from "@dabsi/modules/DbModule";

export default [
  RpcResolver(
    ACL_Admin_GroupsTable,
    { getDataSource: DataSourceFactory2, user: DataRowContext(User) },
    c => $ =>
      $({
        source: c.getDataSource(Group).pick(
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
  RpcResolver(
    ACL_Admin_UsersTable,
    { getDataSource: DataSourceFactory2, group: DataRowContext(Group) },
    c => $ =>
      $({
        source: c.getDataSource(User).pick(
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
