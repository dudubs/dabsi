import { ProjectModuleProvider } from "../../modules/ProjectModuleProvider";
import { Module } from "../../typedi";
import { AclModule } from "../acl/AclModule";
import { SystemModuleProvider } from "../core/SystemModule";
import { AclAdminConfig } from "./server/AclAdminConfig";

@Module({
  providers: [
    ProjectModuleProvider(),
    SystemModuleProvider({
      configs: [AclAdminConfig],
    }),
  ],
  dependencies: [AclModule],
})
export default class AclAdminModule {}
