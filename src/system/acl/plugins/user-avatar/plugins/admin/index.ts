import AclUserAvatarModule from "@dabsi/system/acl-user-avatar";
import AclAdminModule from "@dabsi/system/acl/plugins/admin";
import { Module } from "@dabsi/typedi";

@Module({
  dependencies: [AclUserAvatarModule, AclAdminModule],
})
export default class AclUserAvatarAdmin {}
