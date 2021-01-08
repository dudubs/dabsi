import AclEditGroup from "./AclAdminEditGroup";
import AclAdminGroupBasicInfoInput from "@dabsi/system/acl/plugins/admin/groups/common/AclAdminGroupBasicInfoInput";
import { DataManager } from "@dabsi/typerpc/data-manager";
import { DataTable } from "@dabsi/typerpc/widget/data-table/DataTable";
import { WidgetNamespace } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamspace";

export default DataManager({
  table: DataTable({
    groupName: String,
    countUsers: Number,
  }),
  addInput: AclAdminGroupBasicInfoInput,
  edit: WidgetNamespace(AclEditGroup),
});
