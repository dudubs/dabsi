import { Form } from "../../../../typerpc/widget/form/Form";
import AclEditUser from "../AclEditUser";
import { AclUserContactInfoInput } from "../input/ContactInfoInput";

export const AclUserContactInfoForm = AclEditUser.registerDefault(
  "contactInfo",
  Form({
    input: AclUserContactInfoInput,
  })
);
