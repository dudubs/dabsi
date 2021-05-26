import { DABSI_DIR } from "@dabsi/env";
import MakeModule from "@dabsi/modules/MakeModule";
import PlatformModule from "@dabsi/modules/PlatformModule";
import ProjectModule from "@dabsi/modules/ProjectModule";
import ServerDevModule from "@dabsi/modules/ServerModule.dev";
import { waitForChildProcess } from "@dabsi/modules/waitForChildProcess";
import { CliArgument, CliCommand } from "@dabsi/typecli";
import { Module, Plugin } from "@dabsi/typemodule";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

@Module({
  cli: "native",
})
export default class NativeDevModule {
  //
  readonly packageDir = path.join(
    this.projectModule.settings.directory,
    "packages/native"
  );

  readonly generatedDir = path.join(this.projectModule.generatedDir, "native");

  readonly platform = this.platformModule.getPlatform("native");

  readonly platforms = [
    this.platformModule.commonPlatform,
    this.platformModule.viewPlatform,
    this.platform,
  ];

  @Plugin()
  protected _serverDevModule?: ServerDevModule;

  constructor(
    protected projectModule: ProjectModule,
    protected platformModule: PlatformModule,
    protected makeModule: MakeModule
  ) {
    this.platform.settings.isViewPlatform = true;
    this.platform.settings.includeInternalFiles = true;
  }

  @CliArgument(y =>
    y
      .option("all", { type: "boolean", default: false, alias: "a" })
      .option("clean", { type: "boolean", default: false, alias: "x" })
      .option("make", { type: "boolean", default: false, alias: "m" })
      .option("compile", { type: "boolean", default: false, alias: "c" })
  )
  protected async _command({ all, clean, make, compile }) {
    (all || clean) && (await this.clean());
    (all || make) && (await this.make());
    (all || compile) && (await this.compile());
  }

  async clean() {
    await Promise.all([
      fs.promises
        .rmdir(this.generatedDir, { recursive: true })
        .catch(() => null),
    ]);
  }

  async make() {
    await Promise.all(this.platforms.map(p => p.load()));
    await this.makeSourceFiles();
    await this.makeTsConfigs();
  }

  async makeSourceFiles() {
    const commonCode = ["@dabsi/native/register", "@dabsi/native"]
      .map(p => `import "${p}";\n`)
      .join("");

    await this.platformModule.makeFiles(
      this.generatedDir,
      this.platforms,
      commonCode
    );
  }

  async makeTsConfigs() {
    return this.makeModule.makeTsconfigFile(
      path.join(this.projectModule.configsDir, "tsconfig.dev.native.json"),
      {
        extends: path.join(DABSI_DIR, "configs/tsconfig.base.native.json"),
        compilerOptions: {
          ...this.projectModule.paths.createPathsWithBaseUrl(
            this.projectModule.configsDir
          ),
          module: "esnext",
          sourceMap: false,
          esModuleInterop: true,
          noEmit: false,
          target: "esnext",
          baseUrl: ".",
          outDir: "../packages/native/app-dist",
        },
        include: [
          path.join(this.generatedDir, "index.ts"),
          ...this.platforms.toSeq().flatMap(p => p.directories),
        ],
      }
    );
  }

  @CliCommand("compile", y =>
    y.option("watch", { type: "boolean", default: false, alias: "w" })
  )
  async compile({ watch = false } = {}) {
    await this.make();
    await waitForChildProcess(
      spawn(
        "tsc",
        ["-p", "configs/tsconfig.dev.native.json", ...(watch ? ["-w"] : [])],
        {
          stdio: "inherit",
          cwd: this.projectModule.settings.directory,
        }
      )
    );
  }

  @CliCommand("start-dev")
  startDev() {
    return Promise.all([
      //
      this._serverDevModule?.startDev(),
      this.compile({ watch: true }),
      this.startMeteor(),
    ]);
  }

  @CliCommand("meteor")
  startMeteor() {
    return waitForChildProcess(
      spawn("yarn", ["start"], {
        stdio: "inherit",
        cwd: this.packageDir,
      })
    );
  }
}
