import { Cli } from "@dabsi/modules/Cli";
import { DbModule } from "@dabsi/modules/DbModule";
import { PermissionManager } from "@dabsi/system-old/server/acl/PermissionManager";
import AclDataSources from "@dabsi/system/modules/acl/AclDataSources";
import { Inject, Module, ResolverType } from "@dabsi/typedi";

@Module()
export default class AclModule {
  log = log.get("ACL");

  constructor(
    @Inject() cli: Cli, //
    @Inject() dbModule: DbModule,
    @Inject(AclDataSources) public sources: ResolverType<typeof AclDataSources>
  ) {
    cli.command("acl", cli =>
      cli
        .onRunAsParent(() => dbModule.init())
        .command("make-admin", cli =>
          cli.onRun(async () => {
            const admin = await this.sources.users.touch({
              firstName: "admin",
              lastName: "admin",
            });
            await admin.update({
              loginName: "admin",
              password: "admin",
            });
            const pm = new PermissionManager(dbModule.getConnection());
            await pm.addToken("user", admin.$key, "admin/*");
          })
        )
    );
  }
}
