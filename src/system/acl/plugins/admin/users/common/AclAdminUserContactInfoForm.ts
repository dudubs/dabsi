import AclAdminEditUser from "./AclAdminEditUser";
import "@dabsi/system/acl/plugins/admin/users/common/AclAdminUserBasicInfoForm";
import { InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { TextInput } from "@dabsi/typerpc/input/text-input/TextInput";
import { Form } from "@dabsi/typerpc/widget/form/Form";
export default AclAdminEditUser.registerDefault(
  "contactInfo",
  Form({
    input: InputMap({
      phoneNumber: TextInput({ nullable: true, trim: true }),

      // TODO: Unique, also builtin- unique error
      email: TextInput({ nullable: true, trim: true }),
    }),
  })
);