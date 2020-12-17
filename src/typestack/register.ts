import { Cli } from "@dabsi/modules/Cli";
import { getLastModule } from "@dabsi/typedi/decorators/Module";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import yargs from "yargs";
import { LogLevel } from "./../logging/Logger";

setImmediate(async () => {
  const moduleRunner = new ModuleRunner();
  const module = moduleRunner.getModuleInstance(getLastModule()! as any);
  const cli = moduleRunner.getModuleInstance(Cli);

  cli.install({
    runAsParent: ({ trace }) => {
      trace && log.setLevel(x => x | LogLevel.TRACE);
    },
  });
  await cli.main(yargs.scriptName("ts"));
});
