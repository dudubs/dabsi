import { AclAdminEditGroup } from "./editRpc";
import { AclAdminUsersManager } from "@dabsi/system/acl/plugins/admin/users/common/manager";
import { DataTable } from "@dabsi/typerpc/widget/data-table/rpc";

export const AclAdminGroupUsersTable = AclAdminEditGroup.registerDefault(
  "users",
  DataTable({
    isChecked: Boolean,
    ...AclAdminUsersManager.at("table").row.fields,
  })
);
