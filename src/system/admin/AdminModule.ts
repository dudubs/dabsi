import { ProjectModuleProvider } from "../../modules/ProjectModuleProvider";
import { Module } from "../../typedi";
import { AclModule } from "../acl/AclModule";

@Module({
  dependencies: [AclModule],
  providers: [ProjectModuleProvider()],
})
export class AdminModule {
  constructor() {}
}

// AdminPlugins
// AdminRpc("acl", ...)
