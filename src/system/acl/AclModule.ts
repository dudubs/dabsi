import { Group } from "../../system-old/server/acl/Group";
import { Permission } from "../../system-old/server/acl/Permission";
import { User } from "../../system-old/server/acl/User";
import { Module } from "../../typedi";
import { DbModuleProvider } from "../core/DbModule";

@Module({
  providers: [
    DbModuleProvider({
      entities: [User, Group, Permission],
    }),
  ],
})
export class AclModule {
  constructor() {} // // SystemAclModule
}
