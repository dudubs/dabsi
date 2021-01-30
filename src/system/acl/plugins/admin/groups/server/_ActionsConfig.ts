import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import { AclContext } from "@dabsi/system/acl/context";
import { Group } from "@dabsi/system/acl/entities/Group";
import AclAdminGroupUsers from "@dabsi/system/acl/plugins/admin/groups/common/AclAdminGroupActions";
import { DataRow } from "@dabsi/typedata/row";

export default RpcConfigResolver(
  AclAdminGroupUsers,
  { group: DataRow(Group), sources: AclContext },
  c => $ =>
    $({
      updateUsers: async ({ changes }) => {
        await c.group.at("users").updateRelations(changes);
      },
    })
);
