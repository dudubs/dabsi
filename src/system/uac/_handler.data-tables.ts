import DataContext from "@dabsi/modules/data/DataContext";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import RpcResolverBuilder from "@dabsi/modules/rpc/RpcResolverBuilder";
import UacGroupsTable from "@dabsi/system/uac/common/UacGroupsTable";
import UacUsersTable from "@dabsi/system/uac/common/UacUsersTable";
import { Group } from "@dabsi/system/uac/entities/Group";
import { User } from "@dabsi/system/uac/entities/User";

export default RpcResolverBuilder({
  with: { data: DataContext },
  let: $ => {
    $({
      for: UacUsersTable,
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
      for: UacGroupsTable,
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
