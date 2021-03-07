import { AclAdminEditUser } from "./editRpc";
import { DataManager } from "@dabsi/typerpc/data-manager";
import { AclAdminUserBasicInfoInput } from "@dabsi/system/acl/plugins/admin/users/common/basicInfoInput";
import { DataTable } from "@dabsi/typerpc/widget/data-table/rpc";
import { WidgetNamespace } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamspace";

export const AclAdminUsersManager = DataManager({
  table: DataTable({
    loginName: String,
    firstName: String,
    lastName: String,
  }),
  addInput: AclAdminUserBasicInfoInput,
  edit: WidgetNamespace(AclAdminEditUser),
});
