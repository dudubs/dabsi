import AclAdminEditUser from "./AclAdminEditUser";
import "@dabsi/system/acl/plugins/admin/users/common/AclUserContactInfoForm";
import { BoolInput } from "@dabsi/typerpc/input/bool-input/BoolInput";
import { DataInputMap } from "@dabsi/typerpc/input/data-input-map/DataInputMap";
import { Form } from "@dabsi/typerpc/widget/form/Form";

export default AclAdminEditUser.registerDefault(
  "groups",
  Form({
    input: DataInputMap(BoolInput()),
  })
);
