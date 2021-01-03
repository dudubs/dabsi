import AclUserBasicInfoInput from "./AclUserBasicInfoInput";
import { Form } from "@dabsi/typerpc/widget/form/Form";
import AclEditUser from "@dabsi/system/acl/plugins/admin/users/common/AclEditUser";

export default AclEditUser.registerDefault(
  "basicInfo",
  Form({
    input: AclUserBasicInfoInput,
  })
);
