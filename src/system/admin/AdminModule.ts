import { ProjectModuleProvider } from "../../modules/ProjectModuleProvider";
import { Module } from "../../typedi";
import { AclModule } from "../acl/AclModule";
import { DbModuleProvider } from "../core/DbModule";
import { SystemModule, SystemModuleProvider } from "../core/SystemModule";
import { AdminRpcConfig } from "./server/AdminRpcConfig";
import { AdminInfoConfig } from "./server/AdminInfoConfig";
import { AdminPermission } from "./server/AdminPermission";

@Module({
  dependencies: [AclModule, SystemModule],
  providers: [
    ProjectModuleProvider(),
    SystemModuleProvider({
      configs: [AdminRpcConfig, AdminInfoConfig],
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
