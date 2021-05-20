import * as fs from "fs";
import "@dabsi/register";
import path from "path";
import { ModuleRunner } from "@dabsi/typemodule/ModuleRunner";
import { Resolver } from "@dabsi/typedi";
import { ProjectSettings } from "@dabsi/modules2/ProjectModule2";
import { CliModule2 } from "@dabsi/typecli/CliModule";
if (require.main === module)
  (async () => {
    //
    const [, , projectName, ...argv] = process.argv;

    const projectDir = fs.realpathSync(".");

    const { default: mainModuleTarget } = require(path.join(
      projectDir,
      `dist/${projectName}/src/main.js`
    ));

    const moduleRunner = new ModuleRunner();
    Resolver.Context.assign(moduleRunner.context, [
      new ProjectSettings(projectDir, true),
    ]);
    moduleRunner.get(mainModuleTarget);
    await moduleRunner.process.waitForLast();
    moduleRunner.get(CliModule2).run(argv);
  })();
