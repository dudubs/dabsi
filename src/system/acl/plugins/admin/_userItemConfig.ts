import { DataContext } from "@dabsi/modules/data/context";
import { DataParameterConfigResolver } from "@dabsi/modules/data/paramterConfigResolver";
import { DataRowContext } from "@dabsi/modules/data/rowContext";
import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { User } from "@dabsi/system/acl/entities/User";
import { ACL_Admin_UsersRpc } from "@dabsi/system/acl/plugins/admin/common/usersRpc";

export default [
  DataParameterConfigResolver(
    //
    ACL_Admin_UsersRpc.at("item"),
    User
  ),
  RpcConfigResolver(
    ACL_Admin_UsersRpc.at("item.target.delete"),
    { data: DataContext, group: DataRowContext(User) },
    c => async () => {
      await c.group.delete();
    }
  ),
  RpcConfigResolver(
    ACL_Admin_UsersRpc.at("item.target.updateGroups"),
    { group: DataRowContext(User) },
    c => async checkMap => {
      await c.group.at("groups").updateRelations(checkMap);
    }
  ),
];
