import { Form } from "../../../../typerpc/widget/form/Form";
import AclEditGroup from "../AclEditGroup";
import { AclGroupBasicInfoInput } from "../input/BasicInfoInput";

export const AclGroupBasicInfoForm = AclEditGroup.registerDefault(
  "basicInfo",
  Form({
    input: AclGroupBasicInfoInput,
  })
);
