import AclEditGroup from "./AclAdminEditGroup";
import AclAdminUsersManager from "@dabsi/system/acl/plugins/admin/users/common/AclAdminUsersManager";
import { DataTable } from "@dabsi/typerpc/widget/data-table/DataTable";

export default AclEditGroup.registerDefault(
  "users",
  DataTable({
    isChecked: Boolean,
    ...AclAdminUsersManager.at("table").row.fields,
  })
);
