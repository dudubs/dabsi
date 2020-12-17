import { Cli } from "@dabsi/modules/Cli";
import { AclRequest } from "@dabsi/system-old/server/acl/AclRequest";
import { Group } from "@dabsi/system-old/server/acl/Group";
import { Permission } from "@dabsi/system-old/server/acl/Permission";
import { PermissionManager } from "@dabsi/system-old/server/acl/PermissionManager";
import { User } from "@dabsi/system-old/server/acl/User";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import { DbModule, DbModuleProvider } from "@dabsi/system/core/DbModule";
import { SystemModule } from "@dabsi/system/core/SystemModule";

import { Inject, Module } from "@dabsi/typedi";
import { ResolverType } from "@dabsi/typedi/Resolver";
import { MakeModule } from "@dabsi/typestack/MakeModule";

declare global {
  namespace Express {
    interface Request {
      acl: AclRequest;
    }
  }
}

@Module({
  providers: [
    DbModuleProvider({
      entities: [User, Group, Permission],
    }),
  ],
})
export class AclModule {
  cli = new Cli() //
    .install({ runAsParent: () => this.dbModule.init() })
    .command(
      "make-admin",
      new Cli().install({
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
      })
    );

  log = log.get("ACL");

  constructor(
    @Inject() cli: Cli, //
    @Inject() mMake: MakeModule,
    @Inject() protected dbModule: DbModule,
    @Inject() protected systemModule: SystemModule,
    @Inject(AclDataSources) public sources: ResolverType<typeof AclDataSources>
  ) {
    cli.command("acl", this.cli);
  }
}
