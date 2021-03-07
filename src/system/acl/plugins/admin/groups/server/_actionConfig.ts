import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { AclContext } from "@dabsi/system/acl/context";
import { Group } from "@dabsi/system/acl/entities/Group";
import { AclAdminGroupActions } from "@dabsi/system/acl/plugins/admin/groups/common/actionsRpc";
import { DataRow } from "@dabsi/typedata/row";

export default RpcConfigResolver(
  AclAdminGroupActions,
  { group: DataRow(Group), sources: AclContext },
  c => $ =>
    $({
      updateUsers: async ({ changes }) => {
        await c.group.at("users").updateRelations(changes);
      },
    })
);
