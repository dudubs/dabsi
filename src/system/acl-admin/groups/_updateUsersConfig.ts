import { Group } from "@dabsi/system/acl/entities/Group";
import { DataRow } from "@dabsi/typedata/DataRow";
import AclEditGroup from "@dabsi/system/acl-admin/groups/AclEditGroup";
import { RpcConfigResolver } from "@dabsi/typerpc/RpcConfigResolver";

export default RpcConfigResolver(
  AclEditGroup.at("updateUsers"),
  { group: DataRow(Group) },
  c => async ({ changes }) => {
    await c.group.at("users").updateRelations(changes);
  }
);
