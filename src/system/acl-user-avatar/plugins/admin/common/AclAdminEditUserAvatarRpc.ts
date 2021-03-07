import AclAdminUserAvatarRpc from "@dabsi/system/acl-user-avatar/common/AclEditUserAvatarRpc";
import { AclAdminEditUser } from "@dabsi/system/acl/plugins/admin/users/common/editRpc";

export default AclAdminEditUser.registerDefault(
  "avatar",
  AclAdminUserAvatarRpc
);
