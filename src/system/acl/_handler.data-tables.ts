import DataContext from "@dabsi/modules/data/DataContext";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import RpcResolverBuilder from "@dabsi/modules/rpc/RpcResolverBuilder";
import AclGroupsTable from "@dabsi/system/acl/common/AclGroupsTable";
import AclUsersTable from "@dabsi/system/acl/common/AclUsersTable";
import { Group } from "@dabsi/system/acl/entities/Group";
import { User } from "@dabsi/system/acl/entities/User";

export default RpcResolverBuilder({
  with: { data: DataContext },
  let: $ => {
    $({
      for: AclUsersTable,
      configure: c => $ => {
        const key = c.data.getParameterKey(Group);
        return $({
          searchIn: ["firstName", "lastName", "lastName"],
          source: c.data
            .getSource(User)
            .pick(["loginName", "firstName", "lastName"], {
              ...(key
                ? { selected: { $has: { groups: { $is: key } } } }
                : null),
            }),

          isSelectedRow: key ? row => row.selected! : undefined,
        });
      },
    });

    $({
      for: AclGroupsTable,
      configure: c => $ =>
        $({
          source: c.data.getSource(Group),
          // isSelectedRow: row => row,
          columns: {
            groupName: { field: "name" },
            countUsers: { field: { $count: "users" } },
          },
        }),
    });
  },
});
