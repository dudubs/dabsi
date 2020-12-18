import AclEditUser from "@dabsi/system/acl-admin/users/AclEditUser";
import { BoolInput } from "@dabsi/typerpc/input/bool-input/BoolInput";
import { DataInputMap } from "@dabsi/typerpc/input/data-input-map/DataInputMap";
import { Form } from "@dabsi/typerpc/widget/form/Form";

import "./ContactInfoForm";
export const [AclUserGroupsForm] = AclEditUser.register(
  "groups",
  Form({
    input: DataInputMap(BoolInput()),
  })
);
