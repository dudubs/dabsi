import AclEditGroup from "@dabsi/system/acl-admin/groups/AclEditGroup";
import { AclGroupBasicInfoInput } from "@dabsi/system/acl-admin/groups/input/BasicInfoInput";
import { DataManager } from "@dabsi/typerpc/data-manager";
import { DataTable } from "@dabsi/typerpc/widget/data-table/DataTable";

export default DataManager({
  table: DataTable({
    groupName: String,
  }),
  addInput: AclGroupBasicInfoInput,
  edit: AclEditGroup,
});
