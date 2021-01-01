import AclEditUser from "@dabsi/system/acl/plugins/admin/users/common/AclEditUser";
import "@dabsi/system/acl/plugins/admin/users/common/AclUserBasicInfoForm";
import { InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { TextInput } from "@dabsi/typerpc/input/text-input/TextInput";
import { Form } from "@dabsi/typerpc/widget/form/Form";
export default AclEditUser.registerDefault(
  "contactInfo",
  Form({
    input: InputMap({
      phoneNumber: TextInput({ nullable: true, trim: true }),

      // TODO: Unique, also builtin- unique error
      email: TextInput({ nullable: true, trim: true }),
    }),
  })
);
