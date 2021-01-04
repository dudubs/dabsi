import AclEditGroup from "./AclEditGroup";
import AclUsersManager from "@dabsi/system/modules/acl/plugins/admin/users/common/AclUsersManager";
import { DataTable } from "@dabsi/typerpc/widget/data-table/DataTable";

export default AclEditGroup.registerDefault(
  "users",
  DataTable({
    isChecked: Boolean,
    ...AclUsersManager.at("table").row.fields,
  })
);
