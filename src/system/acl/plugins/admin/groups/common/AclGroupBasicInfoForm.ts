import AclEditGroup from "@dabsi/system/acl/plugins/admin/groups/common/AclEditGroup";
import AclGroupBasicInfoInput from "@dabsi/system/acl/plugins/admin/groups/common/AclGroupBasicInfoInput";
import { Form } from "@dabsi/typerpc/widget/form/Form";

export default AclEditGroup.registerDefault(
  "basicInfo",
  Form({
    input: AclGroupBasicInfoInput,
  })
);
