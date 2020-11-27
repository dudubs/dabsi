import { Lazy } from "../../common/patterns/lazy";
import { Cli } from "../../modules/Cli";
import { ProjectModuleProvider } from "../../modules/ProjectModuleProvider";
import { AclRequest } from "../../system-old/server/acl/AclRequest";
import { Group } from "../../system-old/server/acl/Group";
import { Permission } from "../../system-old/server/acl/Permission";
import { User } from "../../system-old/server/acl/User";
import { DataEntitySource } from "../../typedata/data-entity/DataEntitySource";
import { Inject, Module } from "../../typedi";
import { MakeModule } from "../../typestack/MakeModule";
import { DbModule, DbModuleProvider } from "../core/DbModule";
import { SystemModuleProvider } from "../core/SystemModule";
import { AclRpcConfig } from "./server/AclRpcConfig";

declare global {
  namespace Express {
    interface Request {
      acl: AclRequest;
    }
  }
}

@Module({
  providers: [
    ProjectModuleProvider(),
    DbModuleProvider({
      entities: [User, Group, Permission],
    }),
    SystemModuleProvider({
      configs: [AclRpcConfig],
    }),
  ],
})
export class AclModule {
  cli = new Cli().command("init", cli => cli);

  @Lazy() get sources() {
    return {
      users: DataEntitySource.create(User, this.dbModule.getConnection),
      groups: DataEntitySource.create(Group, this.dbModule.getConnection),
      permissions: DataEntitySource.create(
        Permission,
        this.dbModule.getConnection
      ),
    };
  }

  constructor(
    @Inject() cli: Cli, //
    @Inject() mMake: MakeModule,
    @Inject() protected dbModule: DbModule
  ) {
    cli.command("acl", this.cli);
  } // // SystemAclModule
}
