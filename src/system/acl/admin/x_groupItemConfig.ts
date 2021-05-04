import { DataParameterConfigResolver } from "@dabsi/modules/data";
import { DataRowContext } from "@dabsi/modules/data/DataRowContext";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { ACL_Admin_GroupsRpc } from "@dabsi/system/acl/admin/common/groupsRpc";
import { Group } from "@dabsi/system/acl/entities/Group";

export default [
  DataParameterConfigResolver(ACL_Admin_GroupsRpc.at("item"), Group),
  RpcResolver(
    ACL_Admin_GroupsRpc.at("item.target.delete"),
    { group: DataRowContext(Group) },
    c => async () => {
      await c.group.delete();
    }
  ),
  RpcResolver(
    ACL_Admin_GroupsRpc.at("item.target.updateUsers"),
    { group: DataRowContext(Group) },
    c => async checkMap => {
      await c.group.at("users").updateRelations(checkMap);
    }
  ),
];
