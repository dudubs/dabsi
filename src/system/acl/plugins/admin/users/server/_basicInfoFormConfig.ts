import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { AclContext } from "@dabsi/system/acl/context";
import { User } from "@dabsi/system/acl/entities/User";
import { AclAdminUserBasicInfoForm } from "@dabsi/system/acl/plugins/admin/users/common/basicInfoForm";
import { DataRow } from "@dabsi/typedata/row";
import RpcConfigFactoryResolver from "../../../../../../modules/rpc/configFactoryResolver";

export default RpcConfigResolver(
  AclAdminUserBasicInfoForm,
  {
    user: DataRow(User),
    acl: AclContext,
    getInputConfig: RpcConfigFactoryResolver(
      AclAdminUserBasicInfoForm.at("input")
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
