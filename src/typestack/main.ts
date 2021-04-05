import fs from "fs";
import { LoaderModule2 } from "@dabsi/modules2/LoaderModule2";
import { CliModule2 } from "@dabsi/typecli/CliModule";
import { ModuleRunner } from "@dabsi/typemodule/ModuleRunner";
import { realpathSync } from "fs";

if (require.main === module)
  (async () => {
    const { default: moduleTarget } = require(realpathSync("src/module.ts"));
    const moduleRunner = new ModuleRunner();
    moduleRunner.get(moduleTarget);
    moduleRunner.get(LoaderModule2);
    const cliModule = moduleRunner.get(CliModule2);
    await moduleRunner.process.wait();
    await cliModule.run("ts", process.argv.slice(2));
  })().catch(error => {
    console.error(error);
  });
