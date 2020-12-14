import { ProjectModuleProvider } from "../../modules/ProjectModuleProvider";
import { Module } from "../../typedi";
import { AclModule } from "../acl/AclModule";
import SystemModuleProvider from "../core/SystemModuleProvider";
import { Group } from "./../../system-old/server/acl/Group";
import { User } from "./../../system-old/server/acl/User";
import AclEditGroup from "./groups/AclEditGroup";
import AclGroupsManagerConfig from "./groups/AclGroupsManagerConfig";
import AclEditUser from "./users/AclEditUser";
import AclUsersManagerConfig from "./users/AclUsersManagerConfig";

import "./AclAdminRpc";

@Module({
  providers: [
    ProjectModuleProvider(),
    SystemModuleProvider({
      configs: [AclGroupsManagerConfig, AclUsersManagerConfig],
      contexts: [
        { for: AclEditUser, resolve: [User] },
        { for: AclEditGroup, resolve: [Group] },
      ],
    }),
  ],
  dependencies: [AclModule],
})
export default class AclAdminModule {}
