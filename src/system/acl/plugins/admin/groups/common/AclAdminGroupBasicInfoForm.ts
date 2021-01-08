import AclEditGroup from "./AclAdminEditGroup";
import AclAdminGroupBasicInfoInput from "@dabsi/system/acl/plugins/admin/groups/common/AclAdminGroupBasicInfoInput";
import { Form } from "@dabsi/typerpc/widget/form/Form";

export default AclEditGroup.registerDefault(
  "basicInfo",
  Form({
    input: AclAdminGroupBasicInfoInput,
  })
);
