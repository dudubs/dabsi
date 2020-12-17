import { Form } from "@dabsi/typerpc/widget/form/Form";
import AclEditUser from "@dabsi/system/acl-admin/users/AclEditUser";
import { AclUserContactInfoInput } from "@dabsi/system/acl-admin/users/inputs/ContactInfoInput";

export const AclUserContactInfoForm = AclEditUser.registerDefault(
  "contactInfo",
  Form({
    input: AclUserContactInfoInput,
  })
);
