import { DABSI_DIR } from "@dabsi/env";
import { inspect } from "@dabsi/logging/inspect";
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
    this.platformModule.getPlatform("common"),
    this.platformModule.getPlatform("view"),
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
  protected async _command({ all, clean, make, compile, $args: args }) {
    (all || clean) && (await this.clean());
    (all || make) && (await this.make());
    (all || compile) && (await this.compile());

    const pos = (args as string[]).indexOf("--");
    if (pos > -1) {
      const [cmd, ...cmdArgs] = args.slice(pos + 1);
      if (!cmd) return;
      await waitForChildProcess(
        spawn(cmd, cmdArgs, {
          stdio: "inherit",
          cwd: this.packageDir,
        })
      );
      console.log("OK");
    }
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
    await this.makeIndexSource();
  }

  async makeIndexSource() {
    return this.makeModule.makeTextFile(
      path.join(this.packageDir, "index.js"),
      `import {getNativeAppCompnent} from '@dabsi/native';
import {AppRegistry} from 'react-native';
import './app-dist/${this.projectModule.settings.name}/generated/native';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, getNativeAppCompnent);
`
    );
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

  readonly buildConfigPath = path.join(
    this.projectModule.configsDir,
    "tsconfig.build.native.json"
  );

  async makeTsConfigs() {
    return this.makeModule.makeTsconfigFile(this.buildConfigPath, {
      extends: path.join(DABSI_DIR, "configs/tsconfig.native.base.json"),
      compilerOptions: {
        ...(await this.projectModule.getPaths()).createPathsWithBaseUrl(
          this.projectModule.configsDir
        ),
        module: "esnext",
        sourceMap: true, // debug
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
    });
  }

  @CliCommand("compile", y =>
    y.option("watch", { type: "boolean", default: false, alias: "w" })
  )
  async compile({ watch = false } = {}) {
    await this.make();
    await waitForChildProcess(
      spawn(
        "tsc",
        [
          "-p",
          path.relative(
            this.projectModule.settings.directory,
            this.debugConfigPath
          ),
          ...(watch ? ["-w"] : []),
        ],
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
      waitForChildProcess(
        spawn("yarn", ["start"], {
          stdio: "inherit",
          cwd: this.packageDir,
        })
      ),
    ]);
  }
}
