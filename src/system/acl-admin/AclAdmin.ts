import { AclGroupBasicInfoForm } from "@dabsi/system/acl-admin/groups/edit/BasicInfoForm";
import { AclGroupBasicInfoInput } from "./groups/input/BasicInfoInput";
import { AclUserBasicInfoInput } from "./users/inputs/BasicInfoInput";
import AclUsersManager from "@dabsi/system/acl-admin/users/AclUsersManager";
import "./AclAdminRpc";
import { AclAdminConnection, AclAdminRpc } from "./AclAdminRpc";
import { AclUserContactInfoInput } from "@dabsi/system/acl-admin/users/inputs/ContactInfoInput";
import { AclUserContactInfoForm } from "@dabsi/system/acl-admin/users/forms/ContactInfoForm";
import AclUserBasicInfoForm from "@dabsi/system/acl-admin/users/forms/BasicInfoForm";
import AclGroupsManager from "@dabsi/system/acl-admin/groups/AclGroupsManager";

export default {
  rpc: AclAdminRpc,
  connection: AclAdminConnection,
  users: {
    manager: AclUsersManager,
    inputs: {
      basicInfo: AclUserBasicInfoInput,
      contactInfo: AclUserContactInfoInput,
    },
    forms: {
      basicInfo: AclUserBasicInfoForm,
      contactInfo: AclUserContactInfoForm,
    },
  },
  groups: {
    manager: AclGroupsManager,
    inputs: {
      basicInfo: AclGroupBasicInfoInput,
    },
    forms: {
      basicInfo: AclGroupBasicInfoForm,
    },
  },
};

//
