import { User } from "@dabsi/system/modules/acl/entities/User";
import AclUserBasicInfoForm from "@dabsi/system/modules/acl/plugins/admin/users/common/AclUserBasicInfoForm";
import AclDataSources from "@dabsi/system/modules/acl/AclDataSources";
import OldSystemRpcConfigXResolver from "@dabsi/modules/rpc/OldSystemRpcConfigXResolver";
import { DataRow } from "@dabsi/typedata/DataRow";
import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import RpcConfigFactory from "../../../../../../../modules/rpc/RpcConfigFactory";

export default RpcConfigResolver(
  AclUserBasicInfoForm,
  {
    user: DataRow(User),
    sources: AclDataSources,
    getInputConfig: RpcConfigFactory(AclUserBasicInfoForm.at("input")),
  },
  c => $ =>
    $({
      valueConfig: c.user,
      inputConfig: c.getInputConfig(),
      async submit(value) {
        await c.user.update(value);
      },
    })
);
