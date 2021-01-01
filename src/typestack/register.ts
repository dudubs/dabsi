import { Cli } from "@dabsi/modules/Cli";
import { getLastModule } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import yargs from "yargs";
import { LogLevel } from "@dabsi/logging/Logger";

setImmediate(async () => {
  const moduleRunner = new ModuleRunner();
  const module = moduleRunner.getInstance(getLastModule()! as any);
  const cli = moduleRunner.getInstance(Cli);

  cli.onRunAsParent(({ trace }) => {
    trace && log.setLevel(x => x | LogLevel.TRACE);
  });
  await cli.main(yargs.scriptName("ts"));
});
