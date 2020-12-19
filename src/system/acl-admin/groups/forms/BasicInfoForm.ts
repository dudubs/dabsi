import AclEditGroup from "@dabsi/system/acl-admin/groups/AclEditGroup";
import { AclGroupBasicInfoInput } from "@dabsi/system/acl-admin/groups/input/BasicInfoInput";
import { Form } from "@dabsi/typerpc/widget/form/Form";

export const [AclGroupBasicInfoForm] = AclEditGroup.at("root").register(
  "basicInfo",
  Form({
    input: AclGroupBasicInfoInput,
  })
);