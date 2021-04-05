import { DataContext } from "@dabsi/modules/data/context";
import { ExpressModule2 } from "@dabsi/modules2/ExpressModule2";
import { CliCommand } from "@dabsi/typecli";
import { Module, Plugin } from "@dabsi/typemodule";

@Module({
  cli: "session",
})
export class SessionModule2 {
  //

  @CliCommand("clean")
  async cleanTimeoutSessions(data: DataContext) {
    //
  }

  installExpress(@Plugin() expressModule: ExpressModule2) {
    //
  }
}
