import AclEditUser from "@dabsi/system/acl-admin/users/AclEditUser";
import { DataManager } from "@dabsi/typerpc/data-manager";
import { AclUserBasicInfoInput } from "@dabsi/system/acl-admin/users/inputs/BasicInfoInput";
import { DataTable } from "@dabsi/typerpc/widget/data-table/DataTable";

export default DataManager({
  table: DataTable({
    loginName: String,
    firstName: String,
    lastName: String,
  }),
  addInput: AclUserBasicInfoInput,
  edit: AclEditUser,
});
