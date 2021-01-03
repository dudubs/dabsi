import { Inject, Module } from "@dabsi/typedi";
import { Cli } from "@dabsi/modules/Cli";
import { Hookable } from "@dabsi/modules/Hookable";
import { Awaitable } from "@dabsi/common/typings2/Async";

@Module()
export class ServerModule {
  log = log.get("SERVER");

  onStart = Hookable<(args: any) => Awaitable>();
  onStop = Hookable<(args: any) => Awaitable>();

  constructor(@Inject() cli: Cli) {
    cli
      .command("start", cli =>
        cli.onRun(async args => {
          this.log.info("starting...");
          await this.onStart.invoke(args);
        })
      )
      .command("stop", cli =>
        cli.onRun(async args => {
          this.log.info("stoping...");
          await this.onStop.invoke(args);
        })
      );
  }
}
