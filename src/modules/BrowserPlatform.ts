import express from "express";
import { realpathSync } from "fs";
import * as path from "path";
import webpack from "webpack";
import { makeHtml } from "../common/makeHtml";
import { mapObject } from "../common/object/mapObject";
import { values } from "../common/object/values";
import { existsDirSync } from "../filesystem/existsDirSync";
import { DABSI_PATH } from "../index";
import { inspect } from "../logging/inspect";

import { Inject } from "../typedi/Inject";
import { Module } from "../typedi/Module";
import { DevModule } from "../typestack/DevModule";
import { DevWatchdog } from "../typestack/DevWatchdog";
import { MakeModule } from "../typestack/MakeModule";
import { ProjectInfo } from "../typestack/ProjectInfo";
import { ProjectModule } from "../typestack/ProjectModule";
import { Cli } from "./Cli";
import { ExpressModule } from "./ExpressModule";
import { relativePosixPath } from "./pathHelpers";
import { PlatformInfo } from "./PlatformInfo";

@Module({
  dependencies: [DevModule, ExpressModule],
})
export class BrowserPlatform {
  packCli = new Cli().push({
    lastRun: () => this.pack(),
  });

  cli = new Cli() //
    .connect("pack", this.packCli);

  scripts: string[] = [];

  constructor(
    @Inject() cli: Cli, //
    @Inject() protected watchdog: DevWatchdog,
    @Inject() expressModule: ExpressModule,
    @Inject() protected projectModule: ProjectModule,
    @Inject() protected makeModule: MakeModule
  ) {
    cli.connect("browser", this.cli);

    makeModule.cli.push({
      run: () => this.make(),
    });

    watchdog.exclude.push(path => {
      return /([\\\/]|^)browser[\\\/$]/.test(path);
    });

    expressModule.push({
      build: app => {
        const bundlePath = realpathSync("./bundle/browser");
        app.use("/bundle/browser", express.static(bundlePath));
        app.get("/*", (req, res) => {
          res.setHeader("Content-Type", "text/html");
          res.send(
            makeHtml({
              scripts: [
                ...this.scripts,
                ...["vendor", "index", "runtime"].map(
                  name => `/bundle/browser/${name}.js`
                ),
              ],
            })
          );
        });
      },
    });
  }
  platformInfoMap: Record<string, PlatformInfo>;
  currentPlatformInfo: PlatformInfo;

  protected async init() {
    await this.projectModule.init();
    this.platformInfoMap = mapObject(
      this.projectModule.projectInfoMap,
      p => new PlatformInfo(p, "browser")
    );
    this.currentPlatformInfo = this.platformInfoMap[
      this.projectModule.currentProjectInfo.rootDir
    ];
  }

  protected async makePlatformConfig(platformInfo: PlatformInfo) {
    await this.makeModule.makeJsonFile(platformInfo.tsConfigFileName, {
      extends: relativePosixPath(
        platformInfo.projectInfo.rootDir,
        path.join(DABSI_PATH, platformInfo.tsConfigBaseName)
      ),
    });
  }

  protected async makePlatformModuleConfigs(platformInfo: PlatformInfo) {
    for (const dirName of platformInfo.projectInfo.dirNames) {
      const platformModuleDir = path.join(dirName, platformInfo.name);
      if (!existsDirSync(dirName)) continue;
      await this.makeModule.makeJsonFile(
        path.join(platformModuleDir, "tsconfig.json"),
        {
          extends: relativePosixPath(
            platformModuleDir,
            platformInfo.tsConfigFileName
          ),
        }
      );
    }
  }

  protected async make() {
    await this.init();

    let indexFileCode = "";
    for (const platformInfo of values(this.platformInfoMap)) {
      if (platformInfo.projectInfo.rootDir !== DABSI_PATH) {
        await this.makePlatformConfig(platformInfo);
      }
      await this.makePlatformModuleConfigs(platformInfo);
      for (let indexFileName of platformInfo.findIndexDirNames()) {
        indexFileCode = `import "${this.projectModule.currentProjectInfo.tsConfigInfo.resolvePath(
          this.currentPlatformInfo.generatedDir,
          indexFileName
        )}";\n ${indexFileCode}`;
      }
      // code += platformInfo.createIndexSource();
    }
    await this.makeModule.makeFile(
      this.currentPlatformInfo.generatedIndexFileName,
      indexFileCode
    );
  }

  protected async pack() {
    await this.init();
    webpack({
      mode: "development",
      devtool: "inline-source-map",
      optimization: {
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          name: "vendor",
        },
      },
      output: {
        path: this.currentPlatformInfo.bundleDir,
      },
      entry: {
        index: this.currentPlatformInfo.generatedIndexFileName,
      },
      stats: {
        warnings: false,
      },
      resolve: {
        symlinks: false,
        alias: {
          // TODO: @dabsi
        },
        extensions: [".ts", ".tsx", ".js"],
      },
    }).run((err, status) => {
      status && console.log(status.toString({ color: true }));
    });
  }
}
