import { hasKeys } from "../../common/object/hasKeys";
import { mapObject } from "../../common/object/mapObject";
import { pick } from "../../common/object/pick";
import { Lazy } from "../../common/patterns/lazy";
import { Cli } from "../../modules/Cli";
import { ProjectModuleProvider } from "../../modules/ProjectModuleProvider";
import { AclRequest } from "../../system-old/server/acl/AclRequest";
import { getPasswordHash } from "../../system-old/server/acl/getPasswordHash";
import { Group } from "../../system-old/server/acl/Group";
import { Permission } from "../../system-old/server/acl/Permission";
import { PermissionManager } from "../../system-old/server/acl/PermissionManager";
import { User } from "../../system-old/server/acl/User";
import { DataEntitySource } from "../../typedata/data-entity/DataEntitySource";
import { Inject, Module } from "../../typedi";
import { MakeModule } from "../../typestack/MakeModule";
import { DbModule, DbModuleProvider } from "../core/DbModule";
import { SystemModuleProvider } from "../core/SystemModule";
import { AclConfig } from "./server/AclConfig";

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
      configs: [AclConfig],
    }),
  ],
})
export class AclModule {
  cli = new Cli() //
    .push({ runAsParent: () => this.dbModule.init() })
    .command("make-admin", {
      run: async () => {
        const admin = await this.sources.users.touch({
          firstName: "admin",
          lastName: "admin",
        });
        await admin.update({
          loginName: "admin",
          password: "admin",
        });
        const pm = new PermissionManager(this.dbModule.getConnection());
        await pm.addToken("user", admin.$key, "admin/*");
      },
    });

  log = log.get("ACL");

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
