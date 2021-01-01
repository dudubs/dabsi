import { Cli } from "@dabsi/modules/Cli";
import { DbModule } from "@dabsi/modules/DbModule";
import { PermissionManager } from "@dabsi/system-old/server/acl/PermissionManager";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import { SystemModule } from "@dabsi/system/core";
import { Inject, Module, ResolverType } from "@dabsi/typedi";
import { MakeModule } from "@dabsi/typestack/MakeModule";

@Module({
  dependencies: [DbModule],
})
export default class AclModule {
  cli = new Cli() //
    .onRunAsParent(() => this.dbModule.init())
    .command(
      "make-admin",
      new Cli().onRun(async () => {
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
      })
    );

  log = log.get("ACL");

  constructor(
    @Inject() cli: Cli, //
    @Inject() makeModule: MakeModule,
    @Inject() protected dbModule: DbModule,
    @Inject() protected systemModule: SystemModule,
    @Inject(AclDataSources) public sources: ResolverType<typeof AclDataSources>
  ) {
    cli.command("acl", this.cli);
  }
}
