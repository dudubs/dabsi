import { Awaitable } from "@dabsi/common/typings2/Async";
import {
  DABSI_DIR,
  DABSI_NM_DIR,
  DABSI_SRC_DIR,
  DABSI_WORKSPACE_DIR,
  getWorkspacePackage,
} from "@dabsi/env";
import BrowserPlatformModule from "@dabsi/modules/BrowserPlatformModule";
import MakeModule from "@dabsi/modules/MakeModule";
import { PlatformModule2 } from "@dabsi/modules/PlatformModule2";
import { ProjectModule2 } from "@dabsi/modules/ProjectModule2";
import { CliCommand } from "@dabsi/typecli";
import { Module, Plugin } from "@dabsi/typemodule";
import { spawn } from "child_process";
import * as fs from "fs";
import path from "path";
import fsExtra from "fs-extra";
@Module({
  cli: "heroku",
})
export default class HerokuModule {
  ///

  readonly packageDir = path.join(
    this.projectModule.settings.directory,
    "packages/heroku"
  );

  protected _builders: (() => Awaitable)[] = [];

  constructor(
    protected projectModule: ProjectModule2,
    protected platformModule: PlatformModule2,
    protected makeModule: MakeModule
  ) {}

  installBrowser(@Plugin() bpm: BrowserPlatformModule) {
    this._builders.push(async () => {
      await bpm.pack();
      await fsExtra.copy(
        path.join(this.projectModule.bundleDir, "browser"),
        path.join(this.packageDir, "bundle/browser"),
        {
          recursive: true,
          overwrite: true,
        }
      );
    });
  }

  @CliCommand("build", y =>
    y
      .option("clean", { alias: "c", type: "boolean", default: false })
      .option("make", { alias: "m", type: "boolean", default: false })
  )
  async build({ clean, make }: { clean?: boolean; make?: boolean } = {}) {
    clean && (await this.clean());

    make && (await this.make());

    console.log("building");

    await Promise.all([
      ...this._builders.map(builder => builder()),

      new Promise<void>((resolve, reject) => {
        spawn("tsc", ["-p", "configs/tsconfig.heroku.json"], {
          cwd: this.projectModule.settings.directory,
          stdio: "inherit",
        })
          .on("error", code => {
            reject(code);
          })
          .on("close", () => {
            resolve();
          });
      }),
    ]);
  }

  @CliCommand("compile")
  async compile() {
    await new Promise<void>((resolve, reject) => {
      spawn("tsc", ["-p", "configs/tsconfig.heroku.json"], {
        cwd: this.projectModule.settings.directory,
        stdio: "inherit",
      })
        .on("error", code => {
          reject(code);
        })
        .on("close", () => {
          resolve();
        });
    });
  }

  @CliCommand("clean")
  async clean() {
    console.log("cleaning");

    await Promise.all(
      ["dist", "bundle"].map(name =>
        fs.promises.rmdir(path.join(this.packageDir, name), {
          recursive: true,
        })
      )
    );
  }

  @CliCommand("make")
  async make() {
    console.log("making");

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
