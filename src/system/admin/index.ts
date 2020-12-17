import { AclModule } from "@dabsi/system/acl/AclModule";
import { AdminPermission } from "@dabsi/system/admin/server/AdminPermission";
import { DbModuleProvider } from "@dabsi/system/core/DbModule";
import { SystemModule } from "@dabsi/system/core/SystemModule";
import { Module } from "@dabsi/typedi";

@Module({
  dependencies: [AclModule, SystemModule],
  providers: [
    DbModuleProvider({
      entities: [AdminPermission],
    }),
  ],
})
export default class AdminModule {
  constructor() {}
}
