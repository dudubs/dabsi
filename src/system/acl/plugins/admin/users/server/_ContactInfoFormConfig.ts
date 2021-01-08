import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import { User } from "@dabsi/system/acl/entities/User";
import AclAdminUserContactInfoForm from "@dabsi/system/acl/plugins/admin/users/common/AclAdminUserContactInfoForm";
import { DataRow } from "@dabsi/typedata/DataRow";
import RpcConfigFactory from "../../../../../../modules/rpc/RpcConfigFactory";

export default RpcConfigResolver(
  AclAdminUserContactInfoForm,
  {
    user: DataRow(User),
    getInputConfig: RpcConfigFactory(AclAdminUserContactInfoForm.at("input")),
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
