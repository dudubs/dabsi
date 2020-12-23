import AclEditUser from "@dabsi/system/acl-admin/users/AclEditUser";
import { InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { TextInput } from "@dabsi/typerpc/input/text-input/TextInput";
import { Form } from "@dabsi/typerpc/widget/form/Form";
import "@dabsi/system/acl-admin/users/forms/BasicInfoForm";
export const [AclUserContactInfoForm] = AclEditUser.register(
  "contactInfo",
  Form({
    input: InputMap({
      phoneNumber: TextInput({ nullable: true, trim: true }),

      // TODO: Unique, also builtin- unique error
      email: TextInput({ nullable: true, trim: true }),
    }),
  })
);
