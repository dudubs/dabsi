import { DataRowContext } from "@dabsi/modules/data/rowContext";
import RpcConfigFactoryResolver from "@dabsi/modules/rpc/configFactoryResolver";
import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { AclContext } from "@dabsi/system/acl/context";
import { Group } from "@dabsi/system/acl/entities/Group";
import { ACL_Admin_GroupBasicInfoForm } from "@dabsi/system/acl/plugins/admin/common/groupsRpc";

//
export default RpcConfigResolver(
  ACL_Admin_GroupBasicInfoForm,
  {
    sources: AclContext,
    createInputConfig: RpcConfigFactoryResolver(
      ACL_Admin_GroupBasicInfoForm.at("input")
    ),

    group: DataRowContext(Group),

    // groupLoader: DataRowContext(Group)
  },
  c => $ =>
    $({
      valueConfig: async $ => {
        const { name: groupName } = (await c.group.fetch(["name"])) || {};
        return $({ groupName });
      },
      inputConfig: c.createInputConfig(),
      async submit({ groupName }) {
        await c.group.update({ name: groupName });
      },
    })
);
