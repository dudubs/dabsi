import { User } from "./../../../../system-old/server/acl/User";
import { DataRow } from "./../../../../typedata/DataRow";
import { RpcConfigResolver } from "./../../../../typerpc/RpcConfigResolver";
import { AclUserContactInfoForm } from "./ContactInfoForm";

export const AclUserContactInfoFormConfig = RpcConfigResolver(
  AclUserContactInfoForm,
  { user: DataRow(User) },
  c => $ =>
    $({
      async submit(value) {
        await c.user.update(value);
      },
    })
);
