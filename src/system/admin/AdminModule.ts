import { ProjectModuleProvider } from "../../modules/ProjectModuleProvider";
import { Module } from "../../typedi";
import { AclModule } from "../acl/AclModule";
import { DbModuleProvider } from "../core/DbModule";
import { SystemModuleProvider } from "../core/SystemModule";
import { AdminConfig } from "./server/AdminConfig";
import { AdminInfoConfig } from "./server/AdminInfoConfig";
import { AdminPermission } from "./server/AdminPermission";

@Module({
  dependencies: [AclModule],
  providers: [
    ProjectModuleProvider(),
    SystemModuleProvider({
      configs: [AdminConfig, AdminInfoConfig],
    }),
    DbModuleProvider({
      entities: [AdminPermission],
    }),
  ],
})
export class AdminModule {
  constructor() {}
}

// AdminPlugins
// AdminRpc("acl", ...)
