import DataContext from "@dabsi/modules/data/DataContext";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import AclUsersTable from "@dabsi/system/acl/common/AclUsersTable";
import { Group } from "@dabsi/system/acl/entities/Group";
import { User } from "@dabsi/system/acl/entities/User";

export default RpcResolver(AclUsersTable, $ =>
  $.with({ data: DataContext }).configure(c => $ => {
    const key = c.data.getParameterKey(Group);
    return $({
      searchIn: ["firstName", "lastName", "lastName"],
      source: c.data
        .getSource(User)
        .pick(["loginName", "firstName", "lastName"], {
          ...(key ? { selected: { $has: { groups: { $is: key } } } } : null),
        }),

      isSelectedRow: key ? row => row.selected! : undefined,
    });
  })
);
