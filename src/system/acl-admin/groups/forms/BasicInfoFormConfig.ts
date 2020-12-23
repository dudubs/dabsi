import { Group } from "@dabsi/system/acl/entities/Group";
import { AclGroupBasicInfoForm } from "@dabsi/system/acl-admin/groups/forms/BasicInfoForm";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import SystemRpcConfigResolver from "@dabsi/system/core/SystemRpcConfigResolver";
import { DataRow } from "@dabsi/typedata/DataRow";
import { RpcConfigResolver } from "@dabsi/typerpc/RpcConfigResolver";

export default RpcConfigResolver(
  AclGroupBasicInfoForm,
  {
    sources: AclDataSources,
    createInputConfig: SystemRpcConfigResolver(
      AclGroupBasicInfoForm.at("input")
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
