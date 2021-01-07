import AclEditGroup from "./AclAdminEditGroup";
import AclUsersManager from "@dabsi/system/acl/plugins/admin/users/common/AclUsersManager";
import { DataTable } from "@dabsi/typerpc/widget/data-table/DataTable";

export default AclEditGroup.registerDefault(
  "users",
  DataTable({
    isChecked: Boolean,
    ...AclUsersManager.at("table").row.fields,
  })
);
