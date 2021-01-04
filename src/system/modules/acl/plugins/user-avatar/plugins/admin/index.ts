import AclUserAvatarModule from "@dabsi/system/modules/acl-user-avatar";
import AclAdminModule from "@dabsi/system/modules/acl/plugins/admin";
import { Module } from "@dabsi/typedi";

@Module({
  dependencies: [AclUserAvatarModule, AclAdminModule],
})
export default class AclUserAvatarAdmin {}
