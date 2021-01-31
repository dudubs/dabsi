import { LogLevel } from "@dabsi/logging/Logger";
import { Cli, CliCommand } from "@dabsi/modules/Cli";
import CliModule from "@dabsi/modules/CliModule";
import { getLastModule, Resolver } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import yargs from "yargs";
import ProjectModule from "./ProjectModule";

setImmediate(async () => {
  const moduleRunner = new ModuleRunner();
  const mainModuleTarget = getLastModule()! as any;
  moduleRunner.mainModuleTarget = mainModuleTarget;
  const cliModule = moduleRunner.getInstance(CliModule);

  const module = moduleRunner.getInstance(mainModuleTarget);
  const projectModule = await moduleRunner.getInstance(ProjectModule);
  await projectModule.load();

  await cliModule.main("ts");

  cliModule.cli.onRunAsParent(({ trace }) => {
    trace && log.setLevel(x => x | LogLevel.TRACE);
  });
});
