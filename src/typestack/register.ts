import { LogLevel } from "@dabsi/logging/Logger";
import CliModule from "@dabsi/modules/CliModule";
import LoaderModule from "@dabsi/modules/LoaderModule";
import { getLastModule } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";

setImmediate(async () => {
  const moduleRunner = new ModuleRunner();
  const mainTarget = getLastModule()! as any;
  moduleRunner.mainTarget = mainTarget;
  const cliModule = moduleRunner.resolveInstance(CliModule);

  const module = moduleRunner.resolveInstance(mainTarget);

  await moduleRunner.resolveInstance(LoaderModule).load();

  await cliModule.main("ts");

  cliModule.cli.onRunAsParent(({ trace }) => {
    trace && log.setLevel(x => x | LogLevel.TRACE);
  });
});
