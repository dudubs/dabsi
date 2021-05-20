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

@Module({
  cli: "heroku",
})
export default class HerokuModule {
  ///

  constructor(
    protected projectModule: ProjectModule2,
    protected platformModule: PlatformModule2
  ) {}

  installBrowser(@Plugin() browserModule: BrowserModule2) {
    //
  }

  @CliCommand("build")
  build() {}

  @CliCommand("make")
  async make(makeModule: MakeModule) {
    // make packages/heroku
    //      - package.json
    //      - dist/
    //      - tsconfig.json with baseUrl & paths

    const pkDir = path.join(
      this.projectModule.settings.directory,
      "packages/heroku2"
    );

    const worksapcePk = getWorkspacePackage();

    await Promise.all([
      makeModule.makeJsonFile(path.join(pkDir, "package.json"), {
        name: `@${this.projectModule.settings.name}/heroku`,
        private: true,
        version: "1.1.1",
        scripts: {
          typstack: "node -r tsconfig-paths/register dist/dabsi/src/typestack",
          start: "npm run typestack start",
        },
        dependencies: getLoadedDependencies(worksapcePk),
      }),
      makeModule.makeJsonFile(
        path.join(this.projectModule.configsDir, "tsconfig.heroku2.json"),
        {
          extends: path.posix.relative(
            this.projectModule.configsDir,
            path.join(DABSI_DIR, "configs/tsconfig.server.json")
          ),
          compilerOptions: {
            ...this.projectModule.paths.createPathsWithBaseUrl(
              this.projectModule.configsDir
            ),
            esModuleInterop: true,
            noEmit: false,
            outDir: path.posix.relative(
              this.projectModule.configsDir,
              path.join(pkDir, "dist")
            ),
          },
          include: [
            path.join(this.projectModule.srcDir, "main.ts"),
            path.join(DABSI_SRC_DIR, "typestack"),
            ...this.platformModule.serverLibs,
          ].map(p => path.posix.relative(this.projectModule.configsDir, p)),
        }
      ),
      makeModule.makeJsonFile(path.join(pkDir, "tsconfig.json"), {
        compilerOptions: {
          ...this.projectModule.paths.createPathsWithBaseUrl(
            DABSI_WORKSPACE_DIR
          ),
          baseUrl: "dist",
        },
      }),
    ]);
  }
}

function getLoadedDependencies(pk) {
  const dependencyMap = pk.dependencies || {};

  const loadedPackages = Object.keys(require.cache)
    .toSeq()
    .filter(x => x.startsWith(DABSI_NM_DIR))
    .map(x => x.slice(DABSI_NM_DIR.length).replace(/^[\\\/]+/, ""))
    .map(x => x.match(/(@[^\\\/]+[\\\/][^\\\/]+|[^\\\/]+)/)![0])
    .toSet();

  return Object.keys(dependencyMap)
    .toSeq()
    .filter(k => loadedPackages.has(k))
    .map(k => [k, dependencyMap[k]])
    .fromEntrySeq()
    .toObject();
}
