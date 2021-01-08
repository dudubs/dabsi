import AclAdminEditUser from "./AclAdminEditUser";
import { DataManager } from "@dabsi/typerpc/data-manager";
import AclAdminUserBasicInfoInput from "@dabsi/system/acl/plugins/admin/users/common/AclAdminUserBasicInfoInput";
import { DataTable } from "@dabsi/typerpc/widget/data-table/DataTable";
import { WidgetNamespace } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamspace";

export default DataManager({
  table: DataTable({
    loginName: String,
    firstName: String,
    lastName: String,
  }),
  addInput: AclAdminUserBasicInfoInput,
  edit: WidgetNamespace(AclAdminEditUser),
});
