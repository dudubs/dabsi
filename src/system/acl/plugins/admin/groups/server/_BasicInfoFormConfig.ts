import { Group } from "@dabsi/system/acl/entities/Group";
import AclGroupBasicInfoForm from "@dabsi/system/acl/plugins/admin/groups/common/AclAdminGroupBasicInfoForm";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import OldSystemRpcConfigXResolver from "@dabsi/modules/rpc/OldSystemRpcConfigXResolver";
import { DataRow } from "@dabsi/typedata/DataRow";
import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import RpcConfigFactory from "../../../../../../modules/rpc/RpcConfigFactory";

export default RpcConfigResolver(
  AclGroupBasicInfoForm,
  {
    sources: AclDataSources,
    getInputConfig: RpcConfigFactory(AclGroupBasicInfoForm.at("input")),
    group: DataRow(Group),
  },
  c => $ =>
    $({
      valueConfig: {
        groupName: c.group.name,
      },
      inputConfig: c.getInputConfig(),
      async submit({ groupName }) {
        await c.group.update({ name: groupName });
      },
    })
);
