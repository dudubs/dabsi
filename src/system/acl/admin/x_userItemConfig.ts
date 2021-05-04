import { DataParameterConfigResolver } from "@dabsi/modules/data";
import { DataRowContext } from "@dabsi/modules/data/DataRowContext";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { User } from "@dabsi/system/acl/entities/User";
import { ACL_Admin_UsersRpc } from "@dabsi/system/acl/admin/common/usersRpc";

export default [
  DataParameterConfigResolver(
    //
    ACL_Admin_UsersRpc.at("item"),
    User
  ),
  RpcResolver(
    ACL_Admin_UsersRpc.at("item.target.delete"),
    { group: DataRowContext(User) },
    c => async () => {
      await c.group.delete();
    }
  ),
  RpcResolver(
    ACL_Admin_UsersRpc.at("item.target.updateGroups"),
    { group: DataRowContext(User) },
    c => async checkMap => {
      await c.group.at("groups").updateRelations(checkMap);
    }
  ),
];
