import { hasKeys } from "@dabsi/common/object/hasKeys";
import {
  DABSI_CURRENT_DIR,
  DABSI_ROOT_DIR,
  getPackageConfig,
} from "@dabsi/env";
import { ProjectDirectory } from "@dabsi/modules2/ProjectModule2";
import { CliModule2 } from "@dabsi/typecli/CliModule";
import { Resolver } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typemodule/ModuleRunner";
import { realpathSync } from "fs";
import path from "path";
import { register as registerTsConfigPaths } from "tsconfig-paths";

const getProjectDir = (): string => {
  if (process.env.CWP) {
    return realpathSync(process.env.CWP);
  }

  const config = getPackageConfig().typestack || {};
  if (config.current) {
    return realpathSync(path.resolve(DABSI_ROOT_DIR, config.current));
  }

  return DABSI_CURRENT_DIR;
};

export default function typestackCli(): boolean {
  if (process.argv[2] !== "typestack") return false;

  const tsArgs = process.argv.slice(3);

  const projectDir: string = getProjectDir();

  const tsconfig = require(path.join(projectDir, "tsconfig.json"));

  if (tsconfig?.compilerOptions?.paths) {
    const paths = { ...tsconfig.compilerOptions.paths };

    delete paths["@dabsi/*"];

    if (hasKeys(paths))
      registerTsConfigPaths({
        baseUrl: path.resolve(projectDir, tsconfig.compilerOptions.baseUrl),
        paths: paths,
      });
  }

  const { default: moduleTarget } = require(path.join(
    projectDir,
    "src/module.ts"
  ));

  const moduleRunner = new ModuleRunner();

  Resolver.Context.assign(
    moduleRunner.context,
    Resolver(ProjectDirectory, () => projectDir)
  );

  moduleRunner.get(moduleTarget);
  const cliModule = moduleRunner.get(CliModule2);

  moduleRunner.process.waitAndPush(async () => {
    cliModule.run(tsArgs);
  });

  return true;
}
