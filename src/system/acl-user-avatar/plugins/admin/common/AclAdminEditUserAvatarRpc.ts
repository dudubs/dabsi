import AclUserAvatarRpc from "@dabsi/system/acl-user-avatar/common/AclEditUserAvatarRpc";
import AclAdminEditUser from "@dabsi/system/acl/plugins/admin/users/common/AclAdminEditUser";

export default AclAdminEditUser.registerDefault("avatar", AclUserAvatarRpc);
