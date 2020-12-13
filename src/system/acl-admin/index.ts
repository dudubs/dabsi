import { ProjectModuleProvider } from "../../modules/ProjectModuleProvider";
import { Module } from "../../typedi";
import { AclModule } from "../acl/AclModule";
import SystemModuleProvider from "../core/SystemModuleProvider";
import AclEditUserBasicInfoConfig from "./server/AclEditUserBasicInfoConfig";
import AclGroupsManagerConfig from "./server/AclGroupsManagerConfig";

@Module({
  providers: [
    ProjectModuleProvider(),
    SystemModuleProvider({
      configs: [
        // AclEditUserBasicInfoConfig
        AclGroupsManagerConfig,
      ],
    }),
  ],
  dependencies: [AclModule],
})
export default class AclAdminModule {}
