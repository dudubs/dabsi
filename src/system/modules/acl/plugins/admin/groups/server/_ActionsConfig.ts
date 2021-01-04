import AclGroupUsers from "@dabsi/system/modules/acl/plugins/admin/groups/common/AclGroupActions";
import AclDataSources from "@dabsi/system/modules/acl/AclDataSources";
import { Group } from "@dabsi/system/modules/acl/entities/Group";
import { DataRow } from "@dabsi/typedata/DataRow";
import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";

export default RpcConfigResolver(
  AclGroupUsers,
  { group: DataRow(Group), sources: AclDataSources },
  c => $ =>
    $({
      updateUsers: async ({ changes }) => {
        await c.group.at("users").updateRelations(changes);
      },
    })
);
