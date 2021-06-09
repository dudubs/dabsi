import DataContext from "@dabsi/modules/data/DataContext";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import ACL_AdminRpc from "@dabsi/system/acl/admin/common/rpc";
import { Group } from "@dabsi/system/acl/entities/Group";
import { User } from "@dabsi/system/acl/entities/User";

export default RpcResolver(ACL_AdminRpc, $ =>
  $
    //
    .with({ data: DataContext })
    .at(["usersTable", "editGroup.usersTable"], $ =>
      $.configure(c => $ => {
        const key = c.data.getParameterKey(Group);

        return $({
          source: c.data
            .getSource(User)
            .pick(["loginName", "firstName", "lastName"], {
              ...(key
                ? { selected: { $has: { groups: { $is: key } } } }
                : null),
            }),

          isSelectedRow: key ? row => row.selected! : undefined,
        });
      })
    )
    .at(["groupsTable"], $ =>
      $.configure(c => $ =>
        $({
          source: c.data.getSource(Group),
          // isSelectedRow: row => row,
          columns: {
            groupName: { field: "name" },
            countUsers: { field: { $count: "users" } },
          },
        })
      )
    )
);
