import { AclAdminEditGroup } from "./editRpc";
import { AclAdminGroupBasicInfoInput } from "@dabsi/system/acl/plugins/admin/groups/common/basicInfoInput";
import { Form } from "@dabsi/typerpc/widget/form/rpc";

export const AclAdminGroupBasicInfoForm = AclAdminEditGroup.registerDefault(
  "basicInfo",
  Form({
    input: AclAdminGroupBasicInfoInput,
  })
);
