import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { User } from "@dabsi/system/acl/entities/User";
import AclAdminUserContactInfoForm from "@dabsi/system/acl/plugins/admin/users/common/AclAdminUserContactInfoForm";
import { DataRow } from "@dabsi/typedata/row";
import RpcConfigFactoryResolver from "../../../../../../modules/rpc/configFactoryResolver";

export default RpcConfigResolver(
  AclAdminUserContactInfoForm,
  {
    user: DataRow(User),
    getInputConfig: RpcConfigFactoryResolver(
      AclAdminUserContactInfoForm.at("input")
    ),
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
