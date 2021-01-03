import AclEditGroup from "./AclEditGroup";
import AclGroupBasicInfoInput from "@dabsi/system/acl/plugins/admin/groups/common/AclGroupBasicInfoInput";
import { DataManager } from "@dabsi/typerpc/data-manager";
import { DataTable } from "@dabsi/typerpc/widget/data-table/DataTable";
import { WidgetNamespace } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamspace";

export default DataManager({
  table: DataTable({
    groupName: String,
    countUsers: Number,
  }),
  addInput: AclGroupBasicInfoInput,
  edit: WidgetNamespace(AclEditGroup),
});
