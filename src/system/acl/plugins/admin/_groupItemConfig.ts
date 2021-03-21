import { DataContext } from "@dabsi/modules/data/context";
import { DataParameterConfigResolver } from "@dabsi/modules/data/paramterConfigResolver";
import { DataRowContext } from "@dabsi/modules/data/rowContext";
import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { Group } from "@dabsi/system/acl/entities/Group";
import { User } from "@dabsi/system/acl/entities/User";
import { ACL_Admin_GroupsRpc } from "@dabsi/system/acl/plugins/admin/common/groupsRpc";

export default [
  DataParameterConfigResolver(
    //
    ACL_Admin_GroupsRpc.at("item"),
    Group
  ),
  RpcConfigResolver(
    ACL_Admin_GroupsRpc.at("item.target.users"),
    { data: DataContext, group: DataRowContext(Group) },
    c => $ =>
      $({
        source: c.data
          .getSource(User)
          .pick(["firstName", "lastName", "loginName"], {
            checked: { $has: { groups: { $is: c.group!.$key! } } },
          }),

        searchIn: ["firstName", "lastName", "loginName"],
        loadIsChecked: row => Boolean(row.checked),
      })
  ),
  RpcConfigResolver(
    ACL_Admin_GroupsRpc.at("item.target.updateUsers"),
    { group: DataRowContext(Group) },
    c => async checkMap => {
      console.log(JSON.stringify({ checkMap }));

      await c.group.getSource().at("users").updateRelations(checkMap);
    }
  ),
];
