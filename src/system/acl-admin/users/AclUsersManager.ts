import AclEditUser from "./AclEditUser";
import { DataManager } from "../../../typerpc/data-manager";
import { AclUserBasicInfoInput } from "./input/BasicInfoInput";

export default DataManager({
  tableRowType: {
    loginName: String,
    firstName: String,
    lastName: String,
  },
  addInput: AclUserBasicInfoInput,
  edit: AclEditUser,
});
