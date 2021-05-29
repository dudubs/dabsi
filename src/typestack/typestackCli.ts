import { hasKeys } from "@dabsi/common/object/hasKeys";
import {
  DABSI_CURRENT_DIR,
  DABSI_WORKSPACE_DIR,
  getWorkspacePackage,
} from "@dabsi/env";
import { inspect } from "@dabsi/logging/inspect";
import DevModule from "@dabsi/modules/DevModule";
import { ProjectSettings } from "@dabsi/modules/ProjectModule";
import { CliModule2 } from "@dabsi/typecli/CliModule";
import { Resolver } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typemodule/ModuleRunner";
import { TYPESTACK_CLI_ARG } from "@dabsi/typestack/getTypestackCliArgs";
import * as fs from "fs";
import path from "path";
import { register as registerTsConfigPaths } from "tsconfig-paths";

const getProjectDir = async (): Promise<string> => {
  if (process.env.TSP) {
    return fs.promises.realpath(
      path.resolve(DABSI_WORKSPACE_DIR, process.env.TSP)
    );
  }

  const config = getWorkspacePackage().typestack || {};
  if (config.current) {
    return fs.promises.realpath(
      path.resolve(DABSI_WORKSPACE_DIR, config.current)
    );
  }

  return DABSI_CURRENT_DIR;
};

export default async function typestackCli(): Promise<boolean> {
  if (process.argv[2] !== TYPESTACK_CLI_ARG) return false;

  const tsArgs = process.argv.slice(3);
  const projectDir: string = await getProjectDir();

  const tsConfig = require(path.join(projectDir, "tsconfig.json"));

  if (tsConfig?.compilerOptions?.paths) {
    const paths = { ...tsConfig.compilerOptions.paths };

    delete paths["@dabsi/*"];

    if (hasKeys(paths))
      registerTsConfigPaths({
        baseUrl: path.resolve(projectDir, tsConfig.compilerOptions.baseUrl),
        paths: paths,
      });
  }

  const moduleRunner = new ModuleRunner();

  Resolver.Context.assign(moduleRunner.context, [
    new ProjectSettings(projectDir),
  ]);

  await Promise.all(
    ["main", "main.dev"].map(async moduleBaseName => {
      const modulePath = path.join(projectDir, "src", moduleBaseName + ".ts");

      if (
        !(await fs.promises
          .stat(modulePath)
          .then(s => s.isFile())
          .catch(() => false))
      ) {
        console.log(`No ${moduleBaseName} file.`);
        return;
      }

      const { default: moduleTarget } = require(modulePath);

      if (typeof moduleTarget !== "function") {
        throw new Error(`No module target for ${moduleBaseName}`);
      }
      moduleRunner.get(DevModule);
      moduleRunner.get(moduleTarget);
    })
  );

  const cliModule = moduleRunner.get(CliModule2);

  await moduleRunner.process.waitForLast();

  cliModule.run(tsArgs);

  return true;
}
