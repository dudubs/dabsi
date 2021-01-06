import AclUserBasicInfoInput from "./AclUserBasicInfoInput";
import { Form } from "@dabsi/typerpc/widget/form/Form";
import AclAdminEditUser from "@dabsi/system/acl/plugins/admin/users/common/AclAdminEditUser";

export default AclAdminEditUser.registerDefault(
  "basicInfo",
  Form({
    input: AclUserBasicInfoInput,
  })
);
