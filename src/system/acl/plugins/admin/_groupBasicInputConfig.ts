import { DataRowContext } from "@dabsi/modules/data/rowContext";
import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { checkUniqueName } from "@dabsi/system-old/server/acl/checkUniqueName";
import { Group } from "@dabsi/system/acl/entities/Group";
import { ACL_Admin_GroupBasicInput } from "@dabsi/system/acl/plugins/admin/common/groupsRpc";

export default RpcConfigResolver(
  // ./BasicInfo
  ACL_Admin_GroupBasicInput,
  {
    group: DataRowContext(Group),
  },
  c => $ => {
    return $({
      groupName: {
        $check: async groupName =>
          checkUniqueName(
            c.group.getSource(),
            "name",
            groupName,
            await c.group.fetch(["name"]).then(row => row.name)
          ),
        $config: { minLength: 2, required: true },
      },
    });
  }
);

/*



/*/
