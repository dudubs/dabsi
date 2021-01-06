import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import { User } from "@dabsi/system/acl/entities/User";
import AclUserBasicInfoForm from "@dabsi/system/acl/plugins/admin/users/common/AclUserBasicInfoForm";
import { DataRow } from "@dabsi/typedata/DataRow";
import RpcConfigFactory from "../../../../../../modules/rpc/RpcConfigFactory";

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