import {
  DABSI_DIR,
  DABSI_NM_DIR,
  DABSI_SRC_DIR,
  DABSI_WORKSPACE_DIR,
  getWorkspacePackage,
} from "@dabsi/env";
import { BrowserModule2 } from "@dabsi/modules2/BrowserModule2";
import MakeModule from "@dabsi/modules2/MakeModule";
import { PlatformModule2 } from "@dabsi/modules2/PlatformModule2";
import { ProjectModule2 } from "@dabsi/modules2/ProjectModule2";
import { CliCommand } from "@dabsi/typecli";
import { Module, Plugin } from "@dabsi/typemodule";
import path from "path";
import * as fs from "fs";
@Module({
  cli: "heroku",
})
export default class HerokuModule {
  ///

  readonly packageDir = path.join(
    this.projectModule.settings.directory,
    "packages/heroku"
  );

  constructor(
    protected projectModule: ProjectModule2,
    protected platformModule: PlatformModule2,
    protected makeModule: MakeModule
  ) {}

  installBrowser(@Plugin() browserModule: BrowserModule2) {
    //
    console.log("instal hforb");
  }

  @CliCommand("build", y =>
    y.option("clean", { alias: "c", type: "boolean", default: false })
  )
  async build({ clean }: { clean?: boolean } = {}) {
    await this.clean();
  }

  @CliCommand("clean")
  async clean() {
    await Promise.all(
      ["dist", "bundle"].map(name =>
        fs.promises.rm(path.join(this.packageDir, name), {
          force: true,
          recursive: true,
        })
      )
    );
  }

  @CliCommand("make")
  async make() {
    const worksapcePk = getWorkspacePackage();

    await Promise.all([
      this.makeModule.makeJsonFile(path.join(this.packageDir, "package.json"), {
        name: `@${this.projectModule.settings.name}/heroku`,
        private: true,
        version: "1.1.1",
        engines: worksapcePk.engines,
        scripts: {
          typestack:
            "node -r tsconfig-paths/register dist/dabsi/src/typestack " +
            this.projectModule.settings.name,
          start: "npm run typestack start",
        },
        dependencies: getLoadedDependencies(worksapcePk),
      }),
      this.makeModule.makeJsonFile(
        path.join(this.projectModule.configsDir, "tsconfig.heroku.json"),
        {
          extends: path.posix.relative(
            this.projectModule.configsDir,
            path.join(DABSI_DIR, "configs/tsconfig.server.json")
          ),
          compilerOptions: {
            ...this.projectModule.paths.createPathsWithBaseUrl(
              this.projectModule.configsDir
            ),
            // prod mod
            sourceMap: false,
            esModuleInterop: true,
            noEmit: false,
            outDir: path.posix.relative(
              this.projectModule.configsDir,
              path.join(this.packageDir, "dist")
            ),
          },
          include: [
            path.join(DABSI_SRC_DIR, "register.ts"),
            path.join(this.projectModule.srcDir, "main.ts"),
            path.join(DABSI_SRC_DIR, "typestack/index.ts"),
            ...this.platformModule.serverLibs,
          ].map(p => path.posix.relative(this.projectModule.configsDir, p)),
        }
      ),
      this.makeModule.makeJsonFile(
        path.join(this.packageDir, "tsconfig.json"),
        {
          compilerOptions: {
            ...this.projectModule.paths.createPathsWithBaseUrl(
              DABSI_WORKSPACE_DIR
            ),
            baseUrl: "dist",
          },
        }
      ),
    ]);
  }
}

function getLoadedDependencies(pk) {
  const dependencyMap = pk.dependencies || {};

  const loadedPackages = Object.keys(require.cache)
    .toSeq()
    .filter(x => x.startsWith(DABSI_NM_DIR))
    .map(x => x.slice(DABSI_NM_DIR.length).replace(/^[\\\/]+/, ""))
    .map(x => {
      const name = x.match(/^[^\/]+/)![0];
      if (/ref/.test(x)) console.log({ name });
      if (!name.startsWith("@")) return name;
      throw new Error("TODO");
    })
    .toSet();

  return Object.keys(dependencyMap)
    .toSeq()
    .filter(k => loadedPackages.has(k))
    .map(k => [k, dependencyMap[k]])
    .fromEntrySeq()
    .toObject();
}
