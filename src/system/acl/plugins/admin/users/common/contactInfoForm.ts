import { AclAdminEditUser } from "./editRpc";
import "@dabsi/system/acl/plugins/admin/users/common/basicInfoForm";
import { InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { TextInput } from "@dabsi/typerpc/input/text-input/TextInput";
import { Form } from "@dabsi/typerpc/widget/form/rpc";

export const AclAdminUserContactInfoForm = AclAdminEditUser.registerDefault(
  "contactInfo",
  Form({
    input: InputMap({
      phoneNumber: TextInput({ nullable: true, trim: true }),

      // TODO: Unique, also builtin- unique error
      email: TextInput({ nullable: true, trim: true }),
    }),
  })
);
