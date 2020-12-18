import { User } from "./../../../../system-old/server/acl/User";
import { DataRow } from "./../../../../typedata/DataRow";
import { AclUserGroupsForm } from "@dabsi/system/acl-admin/users/forms/GroupsForm";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import { RpcConfigResolver } from "./../../../../typerpc/RpcConfigResolver";

export default RpcConfigResolver(
  AclUserGroupsForm,
  {
    sources: AclDataSources,
    user: DataRow(User),
  },
  c => $ =>
    $({
      inputConfig: $ =>
        $({
          source: c.sources.groups.pick(["name"], {
            isChecked: {
              $has: { users: { $is: c.user.$key } },
            },
          }),
          getRowLabel: row => row.name,
          getRowValue: row => row.isChecked,
        }),
      async submit(value) {
        await c.user.at("groups").updateRelations(value);
      },
    })
);
