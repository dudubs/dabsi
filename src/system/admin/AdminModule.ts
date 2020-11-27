import { ProjectModuleProvider } from "../../modules/ProjectModuleProvider";
import { Module } from "../../typedi";
import { AclModule } from "../acl/AclModule";
import { SystemModuleProvider } from "../core/SystemModule";
import { AdminConfig } from "./server/AdminConfig";
import { AdminInfoConfig } from "./server/AdminInfoConfig";

@Module({
  dependencies: [AclModule],
  providers: [
    ProjectModuleProvider(),
    SystemModuleProvider({
      configs: [AdminConfig, AdminInfoConfig],
    }),
  ],
})
export class AdminModule {
  constructor() {}
}

// AdminPlugins
// AdminRpc("acl", ...)
