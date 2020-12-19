import { Group } from "./../../../system/acl/entities/Group";
import { DataRow } from "./../../../typedata/DataRow";
import AclEditGroup from "@dabsi/system/acl-admin/groups/AclEditGroup";
import { RpcConfigResolver } from "./../../../typerpc/RpcConfigResolver";

export default RpcConfigResolver(
  AclEditGroup.at("updateUsers"),
  { group: DataRow(Group) },
  c => async ({ changes }) => {
    await c.group.at("users").updateRelations(changes);
  }
);
