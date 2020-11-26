import yargs from "yargs";
import { Cli } from "../modules/Cli";
import { getLastModule } from "../typedi/decorators/Module";

import { ModuleRunner } from "../typedi/ModuleRunner";

setImmediate(async () => {
  const moduleRunner = new ModuleRunner();
  const module = moduleRunner.get(getLastModule());
  const cli = moduleRunner.get(Cli);
  await cli.main(yargs.scriptName("ts"));
});
