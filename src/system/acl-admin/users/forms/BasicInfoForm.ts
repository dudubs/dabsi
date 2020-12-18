import { AclUserBasicInfoInput } from "@dabsi/system/acl-admin/users/inputs/BasicInfoInput";
import { Form } from "@dabsi/typerpc/widget/form/Form";
import AclEditUser from "@dabsi/system/acl-admin/users/AclEditUser";

export const [AclUserBasicInfoForm] = AclEditUser.register(
  "basicInfo",
  Form({
    input: AclUserBasicInfoInput,
  })
);
