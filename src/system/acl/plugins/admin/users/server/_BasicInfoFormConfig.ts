import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import { User } from "@dabsi/system/acl/entities/User";
import AclAdminUserBasicInfoForm from "@dabsi/system/acl/plugins/admin/users/common/AclAdminUserBasicInfoForm";
import { DataRow } from "@dabsi/typedata/DataRow";
import RpcConfigFactoryResolver from "../../../../../../modules/rpc/RpcConfigFactoryResolver";

export default RpcConfigResolver(
  AclAdminUserBasicInfoForm,
  {
    user: DataRow(User),
    sources: AclDataSources,
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
