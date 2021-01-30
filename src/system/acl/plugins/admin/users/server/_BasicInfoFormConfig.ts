import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import { AclContext } from "@dabsi/system/acl/context";
import { User } from "@dabsi/system/acl/entities/User";
import AclAdminUserBasicInfoForm from "@dabsi/system/acl/plugins/admin/users/common/AclAdminUserBasicInfoForm";
import { DataRow } from "@dabsi/typedata/row";
import RpcConfigFactoryResolver from "../../../../../../modules/rpc/RpcConfigFactoryResolver";

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
