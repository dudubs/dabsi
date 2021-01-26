import { LogLevel } from "@dabsi/logging/Logger";
import { Cli, CliCommand } from "@dabsi/modules/Cli";
import { getLastModule, Resolver } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import yargs from "yargs";
import ProjectModule from "./ProjectModule";

setImmediate(async () => {
  const cli = new Cli();
  const moduleRunner = new ModuleRunner(moduleInstance => {
    CliCommand.build(cli, moduleInstance, moduleRunner.context);
  });
  Resolver.provide(
    moduleRunner.context,
    Cli.provide(() => cli)
  );
  const module = moduleRunner.getInstance(getLastModule()! as any);
  const projectModule = await moduleRunner.getInstance(ProjectModule);
  await projectModule.load();

  cli.onRunAsParent(({ trace }) => {
    trace && log.setLevel(x => x | LogLevel.TRACE);
  });

  await cli.main(yargs.scriptName("ts"));
});
