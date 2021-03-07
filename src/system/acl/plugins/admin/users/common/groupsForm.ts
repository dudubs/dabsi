import { AclAdminEditUser } from "./editRpc";
import "@dabsi/system/acl/plugins/admin/users/common/contactInfoForm";
import { BoolInput } from "@dabsi/typerpc/input/bool-input/BoolInput";
import { DataInputMap } from "@dabsi/typerpc/input/data-input-map/DataInputMap";
import { Form } from "@dabsi/typerpc/widget/form/rpc";

export const AclAdminUserGroupsForm = AclAdminEditUser.registerDefault(
  "groups",
  Form({
    input: DataInputMap(BoolInput()),
  })
);
