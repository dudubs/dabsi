import { DataContext } from "@dabsi/modules/data/context";
import { DataParameterConfigResolver } from "@dabsi/modules/data/paramterConfigResolver";
import { DataRowContext } from "@dabsi/modules/data/rowContext";
import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { Group } from "@dabsi/system/acl/entities/Group";
import { ACL_Admin_GroupsRpc } from "@dabsi/system/acl/plugins/admin/common/groupsRpc";

export default [
  DataParameterConfigResolver(
    //
    ACL_Admin_GroupsRpc.at("item"),
    Group
  ),
  RpcConfigResolver(
    ACL_Admin_GroupsRpc.at("item.target.delete"),
    { data: DataContext, group: DataRowContext(Group) },
    c => async () => {
      await c.group.delete();
    }
  ),
  RpcConfigResolver(
    ACL_Admin_GroupsRpc.at("item.target.updateUsers"),
    { group: DataRowContext(Group) },
    c => async checkMap => {
      await c.group.at("users").updateRelations(checkMap);
    }
  ),
];