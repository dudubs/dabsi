import { User } from "@dabsi/system/acl/entities/AclUser";
import { AclUserContactInfoForm } from "@dabsi/system/acl-admin/users/forms/ContactInfoForm";
import { SystemRpcConfigResolver } from "@dabsi/system/core/SystemRpcConfigResolver";
import { DataRow } from "@dabsi/typedata/DataRow";
import { RpcConfigResolver } from "@dabsi/typerpc/RpcConfigResolver";

export default RpcConfigResolver(
  AclUserContactInfoForm,
  {
    user: DataRow(User),
    createInputConfig: SystemRpcConfigResolver(
      AclUserContactInfoForm.at("input")
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
