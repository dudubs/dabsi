import "@dabsi/system/acl-admin/AclAdminRpc";
import { AclModule } from "@dabsi/system/acl/AclModule";
import { Module } from "@dabsi/typedi";

@Module({
  dependencies: [AclModule],
})
export default class AclAdminModule {}
