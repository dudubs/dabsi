import AclAdminGroupUsers from "@dabsi/system/acl/plugins/admin/groups/common/AclAdminGroupActions";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import { Group } from "@dabsi/system/acl/entities/Group";
import { DataRow } from "@dabsi/typedata/DataRow";
import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";

export default RpcConfigResolver(
  AclAdminGroupUsers,
  { group: DataRow(Group), sources: AclDataSources },
  c => $ =>
    $({
      updateUsers: async ({ changes }) => {
        await c.group.at("users").updateRelations(changes);
      },
    })
);
