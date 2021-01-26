import { Cli, CliCommand } from "@dabsi/modules/Cli";
import DataModule from "@dabsi/modules/data";
import { DbModule } from "@dabsi/modules/DbModule";
import Session from "@dabsi/modules/session/entities/Session";
import { DataResolver } from "@dabsi/system/storage/DataResolver";
import { Inject, Module } from "@dabsi/typedi";

@Module({
  dependencies: [DataModule],
})
export default class SessionModule {
  constructor(@Inject() protected dataResolver: DataResolver) {}

  @CliCommand("chaka.mayka")
  async logStats(@Inject() dbModule: DbModule, @Inject() data: DataResolver) {
    await dbModule.init();

    console.log("Hello", { dbModule, data });

    // // @Inject() data:
    // await this.dbModule.init();
    // const sessions = this.dataResolver.getSource(Session);
    // console.log(
    //   `count timeout sessions: ${await (async () => {
    //     return await sessions.getCountRows();
    //   })()}`
    // );
  }
}
