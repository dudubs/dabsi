import { User } from "@dabsi/system/acl/entities/User";
import { DataRow } from "@dabsi/typedata/DataRow";
import AclUserGroupsForm from "@dabsi/system/acl/plugins/admin/users/common/AclUserGroupsForm";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import { RpcConfigResolver } from "@dabsi/typerpc/RpcConfigResolver";
import { Resolver } from "@dabsi/typedi";

export default RpcConfigResolver(
  AclUserGroupsForm,
  {
    sources: AclDataSources,
    user: DataRow(User),
  },
  c => $ => {
    return $({
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
    });
  }
);
