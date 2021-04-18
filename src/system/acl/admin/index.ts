import "@dabsi/system/acl/admin/common/rpc";
import { AclModule } from "@dabsi/system/acl/module";
import { AdminModule } from "@dabsi/system/admin/module";
import { Module } from "@dabsi/typemodule";

@Module({
  dependencies: [AclModule, AdminModule],
})
export default class AclAdminModule {}
