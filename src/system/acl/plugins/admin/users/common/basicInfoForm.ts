import { AclAdminUserBasicInfoInput } from "./basicInfoInput";
import { Form } from "@dabsi/typerpc/widget/form/rpc";
import { AclAdminEditUser } from "@dabsi/system/acl/plugins/admin/users/common/editRpc";

export const AclAdminUserBasicInfoForm = AclAdminEditUser.registerDefault(
  "basicInfo",
  Form({
    input: AclAdminUserBasicInfoInput,
  })
);
