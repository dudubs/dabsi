import AclEditUser from "./AclEditUser";
import { DataManager } from "@dabsi/typerpc/data-manager";
import AclUserBasicInfoInput from "@dabsi/system/acl/plugins/admin/users/common/AclUserBasicInfoInput";
import { DataTable } from "@dabsi/typerpc/widget/data-table/DataTable";
import { WidgetNamespace } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamspace";

export default DataManager({
  table: DataTable({
    loginName: String,
    firstName: String,
    lastName: String,
  }),
  addInput: AclUserBasicInfoInput,
  edit: WidgetNamespace(AclEditUser),
});
