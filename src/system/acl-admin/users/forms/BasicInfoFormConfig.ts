import { User } from "@dabsi/system/acl/entities/AclUser";
import { AclUserBasicInfoForm } from "@dabsi/system/acl-admin/users/forms/BasicInfoForm";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import SystemRpcConfigResolver from "@dabsi/system/core/SystemRpcConfigResolver";
import { DataRow } from "@dabsi/typedata/DataRow";
import { RpcConfigResolver } from "@dabsi/typerpc/RpcConfigResolver";

export default RpcConfigResolver(
  AclUserBasicInfoForm,
  {
    user: DataRow(User),
    sources: AclDataSources,
    createInputConfig: SystemRpcConfigResolver(
      AclUserBasicInfoForm.at("input")
    ),
  },
  c => $ =>
    $({
      valueConfig: c.user,
      inputConfig: c.createInputConfig(),
      async submit(value) {
        await c.user.update(value);
      },
    })
);
