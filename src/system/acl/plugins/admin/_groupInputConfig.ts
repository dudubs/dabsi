import { DataRowContext } from "@dabsi/modules/data/rowContext";
import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { checkUniqueName } from "@dabsi/system-old/server/acl/checkUniqueName";
import { Group } from "@dabsi/system/acl/entities/Group";
import { ACL_Admin_GroupBasicInput } from "@dabsi/system/acl/plugins/admin/common/groupsRpc";
import { DataFormConfigResolver } from "@dabsi/typerpc/data-form/handler";

//
export default [
  DataFormConfigResolver(ACL_Admin_GroupBasicInput, Group, {}, c => $ =>
    $({
      selection: { pick: ["name"] },
      inserttable: true,
      valueConfig: ($, group) =>
        $({
          groupName: group?.name,
        }),
      commitConfig: ($, value) =>
        $({
          name: value.groupName,
        }),
    })
  ),
  RpcConfigResolver(
    ACL_Admin_GroupBasicInput.at("map.groupName"),
    { group: DataRowContext(Group) },
    c => $ =>
      $({
        $check: async groupName =>
          checkUniqueName(
            c.group.getSource(),
            "name",
            groupName,
            await c.group.fetch(["name"]).then(row => row.name)
          ),
      })
  ),
];
