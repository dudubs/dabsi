import { AclAdminGroupBasicInfoInput } from "@dabsi/system/acl/plugins/admin/groups/common/basicInfoInput";
import { DataManager } from "@dabsi/typerpc/data-manager";
import { DataTable } from "@dabsi/typerpc/widget/data-table/rpc";
import { WidgetNamespace } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamspace";
import { AclAdminEditGroup } from "./editRpc";

export const AclAdminGroupsManager = DataManager({
  table: DataTable({
    groupName: String,
    countUsers: Number,
  }),
  addInput: AclAdminGroupBasicInfoInput,
  edit: WidgetNamespace(AclAdminEditGroup),
});
