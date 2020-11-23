import express from "express";
import { realpathSync } from "fs";
import webpack from "webpack";
import { makeHtml } from "../common/makeHtml";
import { Lazy } from "../common/patterns/lazy";
import { DABSI_PATH } from "../index";

import { Inject } from "../typedi/Inject";
import { Module } from "../typedi/Module";
import { DevModule } from "../typestack/DevModule";
import { DevWatchdog } from "../typestack/DevWatchdog";
import { ProjectModule } from "../typestack/ProjectModule";
import { Cli } from "./Cli";
import { ExpressModule } from "./ExpressModule";
import { MakeModule } from "./MakeModule";
import { relativePosixPath } from "./pathHelpers";
import { PlatformBuilder } from "./PlatformBuilder";

@Module({
  dependencies: [DevModule, ExpressModule],
})
export class BrowserPlatform {
  packCli = new Cli().push({
    lastRun: () => this.pack(),
  });

  makeCli = new Cli().push({
    lastRun: () => this.make(),
  });

  cli = new Cli() //
    .connect("pack", this.packCli)
    .connect("make", this.makeCli);

  scripts: string[] = [];

  constructor(
    @Inject() cli: Cli, //
    @Inject() protected platformBuilder: PlatformBuilder,
    @Inject() protected watchdog: DevWatchdog,
    @Inject() expressModule: ExpressModule,
    @Inject() protected makeModule: MakeModule,
    @Inject() protected projectModule: ProjectModule
  ) {
    cli.connect("browser", this.cli);

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

    makeModule.cli.push({
      run: () => this.make(),
    });
  }

  @Lazy()
  protected get platform() {
    return this.platformBuilder.create("browser");
  }

  protected async make() {
    if (this.projectModule.path === DABSI_PATH) return;

    await this.makeModule.makeTsConfigWithPaths(this.platform.srcPath);

    await this.makeIndexFile();
  }

  createIndexFileSource() {
    let code = "// @generated\n\n";
    for (let indexFileName of this.platform.indexPaths) {
      code += `import "${relativePosixPath(
        this.platform.generatedPath,
        indexFileName
      )}";\n`;
    }
    return code;
  }

  protected makeIndexFile() {
    return this.makeModule.makeFile(
      this.platform.generatedIndexPath,
      this.createIndexFileSource()
    );
  }

  protected async pack() {
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
        path: this.platform.bundlePath,
      },
      entry: {
        index: this.platform.generatedIndexPath,
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
