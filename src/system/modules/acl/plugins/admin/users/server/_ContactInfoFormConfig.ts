import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import { User } from "@dabsi/system/modules/acl/entities/User";
import AclUserContactInfoForm from "@dabsi/system/modules/acl/plugins/admin/users/common/AclUserContactInfoForm";
import { DataRow } from "@dabsi/typedata/DataRow";
import RpcConfigFactory from "../../../../../../../modules/rpc/RpcConfigFactory";

export default RpcConfigResolver(
  AclUserContactInfoForm,
  {
    user: DataRow(User),
    getInputConfig: RpcConfigFactory(AclUserContactInfoForm.at("input")),
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
