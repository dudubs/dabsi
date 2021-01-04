import { Group } from "@dabsi/system/modules/acl/entities/Group";
import AclGroupBasicInfoForm from "@dabsi/system/modules/acl/plugins/admin/groups/common/AclGroupBasicInfoForm";
import AclDataSources from "@dabsi/system/modules/acl/AclDataSources";
import OldSystemRpcConfigXResolver from "@dabsi/modules/rpc/OldSystemRpcConfigXResolver";
import { DataRow } from "@dabsi/typedata/DataRow";
import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import RpcConfigFactory from "../../../../../../../modules/rpc/RpcConfigFactory";

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
