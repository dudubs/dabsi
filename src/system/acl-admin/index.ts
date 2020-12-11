import { ProjectModuleProvider } from "../../modules/ProjectModuleProvider";
import { Module } from "../../typedi";
import { AclModule } from "../acl/AclModule";
import { SystemModuleProvider } from "../core/SystemModule";
import AclAdminRpcConfig from "./server/AclAdminRpcConfig";

@Module({
  providers: [
    ProjectModuleProvider(),
    SystemModuleProvider({
      configs: [AclAdminRpcConfig],
    }),
  ],
  dependencies: [AclModule],
})
export default class AclAdminModule {}
