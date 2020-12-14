import { AclUserBasicInfoInput } from "../input/BasicInfoInput";
import { Form } from "../../../../typerpc/widget/form/Form";
import AclEditUser from "../AclEditUser";

export const AclUserBasicInfoForm = AclEditUser.registerDefault(
  "basicInfo",
  Form({
    input: AclUserBasicInfoInput,
  })
);
