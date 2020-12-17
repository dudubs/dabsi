import AclEditUser from "@dabsi/system/acl-admin/users/AclEditUser";
import { DataManager } from "@dabsi/typerpc/data-manager";
import { AclUserBasicInfoInput } from "@dabsi/system/acl-admin/users/inputs/BasicInfoInput";

export default DataManager({
  tableRowType: {
    loginName: String,
    firstName: String,
    lastName: String,
  },
  addInput: AclUserBasicInfoInput,
  edit: AclEditUser,
});
