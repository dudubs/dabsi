import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import { Group } from "@dabsi/system/acl/entities/Group";
import AclAdminGroupBasicInfoForm from "@dabsi/system/acl/plugins/admin/groups/common/AclAdminGroupBasicInfoForm";
import { DataRow } from "@dabsi/typedata/DataRow";
import RpcConfigFactoryResolver from "../../../../../../modules/rpc/RpcConfigFactoryResolver";

export default RpcConfigResolver(
  AclAdminGroupBasicInfoForm,
  {
    sources: AclDataSources,
    createInputConfig: RpcConfigFactoryResolver(
      AclAdminGroupBasicInfoForm.at("input")
    ),
    group: DataRow(Group),
  },
  c => $ =>
    $({
      valueConfig: {
        groupName: c.group.name,
      },
      inputConfig: c.createInputConfig(),
      async submit({ groupName }) {
        await c.group.update({ name: groupName });
      },
    })
);
