import "@dabsi/system/acl/admin/common/AclRpc";
import AclModule from "@dabsi/system/acl";
import { AdminModule } from "@dabsi/system/admin";
import { Module } from "@dabsi/typemodule";

@Module({
  dependencies: [AclModule, AdminModule],
})
export default class AclAdminModule {}
