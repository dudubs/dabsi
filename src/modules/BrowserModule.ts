import { makeHtml } from "@dabsi/common/makeHtml";
import { mapObject } from "@dabsi/common/object/mapObject";
import { pick } from "@dabsi/common/object/pick";
import { values } from "@dabsi/common/object/values";
import { Lazy } from "@dabsi/common/patterns/lazy";
import { Once } from "@dabsi/common/patterns/Once";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { DABSI_PATH, DABSI_SRC_PATH } from "@dabsi/index";
import { Cli } from "@dabsi/modules/Cli";
import { ExpressModule } from "@dabsi/modules/ExpressModule";
import { HooksInstaller } from "@dabsi/modules/HooksInstaller";
import { relativePosixPath } from "@dabsi/modules/pathHelpers";
import ProjectPlatform from "@dabsi/modules/ProjectPlatform";
import { Inject, Module } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { DevModule } from "@dabsi/typestack/DevModule";
import { MakeModule } from "@dabsi/typestack/MakeModule";
import ProjectManager from "@dabsi/typestack/ProjectManager";
import colors from "colors/safe";
import express from "express";
import fs from "fs";
import * as path from "path";
import tsConfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import webpack from "webpack";
import { DABSI_CURRENT_PATH } from "../index";

@Module({
  dependencies: [DevModule, ExpressModule],
})
export default class BrowserModule {
  packCli = new Cli().install({
    run: {
      after: () => this.pack(),
    },
  });

  cli = new Cli() //
    .command("pack", this.packCli);

  scripts: string[] = [];

  log = log.get("BROWSER");

  constructor(
    @Inject() protected projectManager: ProjectManager,
    @Inject() protected makeModule: MakeModule,
    @Inject() expressModule: ExpressModule,
    @Inject() protected runner: ModuleRunner,
    @Inject() cli: Cli
  ) {
    cli.command("browser", this.cli);

    makeModule.cli.install({
      run: () => this.make(),
    });

    expressModule.install({
      postRoutes: app => {
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
      routes: app => {
        const bundlePath = fs.realpathSync("./bundle/browser");
        const bundleStatic = express.static(bundlePath);
        app.use("/bundle/browser", (req, res, next) => {
          bundleStatic(req, res, () => {
            if (req.path.endsWith(".js")) {
              return res
                .contentType("text/javascript")
                .send(`console.error("script not found ${req.path}")`);
            }
            res.status(404).send(`file not found ${req.path}`);
          });
        });
        //
      },
    });
  }

  projectPlatformMap: Record<string, ProjectPlatform>;

  mainProjectPlatform: ProjectPlatform;

  @Once() async init() {
    await this.projectManager.init();
    this.projectPlatformMap = mapObject(
      this.projectManager.projectMap,
      p => new ProjectPlatform(p, "browser")
    );
    this.mainProjectPlatform = this.projectPlatformMap[
      this.projectManager.mainProject.dir
    ];
  }

  protected async _makeProjectPlatformConfig(projectPlatform: ProjectPlatform) {
    const skip = projectPlatform.project.dir === DABSI_PATH;
    this.log.trace(
      () =>
        `Make project ts-config "${relativePathToCurrent(
          projectPlatform.tsConfigFileName
        )}"${skip ? colors.yellow(` (skipped)`) : ""}.`
    );

    if (skip) return;
    await this.makeModule.makeJsonFile(projectPlatform.tsConfigFileName, {
      extends: relativePosixPath(
        projectPlatform.project.dir,
        path.join(DABSI_PATH, projectPlatform.tsConfigBaseName)
      ),
      ...pick(projectPlatform.project.tsConfigInfo.config, "compilerOptions"),
      include: [
        relativePosixPath(
          projectPlatform.project.dir,
          projectPlatform.generatedIndexFileName
        ),
      ],
    });
  }

  protected async _makeProjectPlatformModules(
    projectPlatform: ProjectPlatform
  ) {
    for (const projectModule of values(projectPlatform.project.moduleMap)) {
      const projectPlatformModuleDir =
        projectModule.fileMap[projectPlatform.name];
      if (!projectPlatformModuleDir) continue;
      if (!projectPlatformModuleDir.stat.isDirectory()) {
        this.log.warn(
          () =>
            `Expected "${projectPlatformModuleDir.fileName}" will be a directory.`
        );
        continue;
      }

      const platformModuleIndexFileName = path.join(
        projectPlatformModuleDir.fileName,
        "index.ts"
      );

      if (!fs.existsSync(platformModuleIndexFileName)) continue;
      this._indexFileNames!.add(platformModuleIndexFileName);

      const platformModuleTsConfigFileName = path.join(
        projectPlatformModuleDir.fileName,
        "tsconfig.json"
      );
      this.log.trace(
        () =>
          `Make project module ts-config "${relativePathToCurrent(
            platformModuleTsConfigFileName
          )}".`
      );

      await this.makeModule.makeJsonFile(platformModuleTsConfigFileName, {
        extends: relativePosixPath(
          projectPlatformModuleDir.fileName,
          projectPlatform.tsConfigFileName
        ),
      });
    }
  }

  protected async _makeConfigs() {
    for (const projectPlatform of values(this.projectPlatformMap)) {
      this.log.trace(
        () =>
          `Make platform ${relativePathToCurrent(projectPlatform.project.dir)}`
      );

      await this._makeProjectPlatformConfig(projectPlatform);
      await this._makeProjectPlatformModules(projectPlatform);
    }
  }
  _indexFileNames: Set<string> | null = null;

  protected async _makeIndexFile() {
    let indexFileCode = ``;

    for (const indexFileName of this._indexFileNames!) {
      indexFileCode += `import "${this.projectManager.mainProject.tsConfigInfo.resolvePath(
        this.mainProjectPlatform.generatedDir,
        indexFileName
      )}";\n`;
    }
    await this.makeModule.makeFile(
      this.mainProjectPlatform.generatedIndexFileName,
      `import "${this.projectManager.mainProject.tsConfigInfo.resolvePath(
        this.mainProjectPlatform.generatedDir,
        path.join(DABSI_SRC_PATH, "common/register.ts")
      )}";\n${indexFileCode}`
    );
  }

  protected hooks = {
    make: HooksInstaller.empty as (_: {
      indexFileNames: Set<string>;
    }) => Awaitable,
  };

  install = HooksInstaller(this.hooks);

  async make() {
    await this.init();

    this._indexFileNames = new Set();
    // await this.hooks.make();
    await this._makeConfigs();
    await this.hooks.make({ indexFileNames: this._indexFileNames });
    await this._makeIndexFile();

    this._indexFileNames = null;
  }

  webpackCallback = (err, stats) => {
    if (stats) {
      this.log.info(stats.toString(this.webpackConfig.stats));
    }
  };

  @Lazy() get webpackConfig(): webpack.Configuration {
    return {
      mode: "development",
      devtool: "inline-source-map",
      node: {
        __filename: true,
        __dirname: true,
      },
      optimization: {
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          name: "vendor",
        },
      },
      output: {
        path: this.mainProjectPlatform.bundleDir,
      },
      entry: {
        index: this.mainProjectPlatform.generatedIndexFileName,
      },
      stats: {
        warnings: false,
        colors: true,
      },
      resolve: {
        // symlinks: false,
        plugins: [new tsConfigPathsWebpackPlugin()],
        alias: {
          // TODO: @dabsi
        },
        extensions: [".ts", ".tsx", ".js"],
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            options: {
              configFile: this.mainProjectPlatform.tsConfigFileName,
              transpileOnly: true,
              compilerOptions: {
                noEmit: false,
              },
            },
          },
        ],
      },
    };
  }

  protected async pack() {
    await this.init();
    webpack(this.webpackConfig).run(this.webpackCallback);
  }
}

function relativePathToCurrent(path: string) {
  return relativePosixPath(DABSI_CURRENT_PATH, path);
}
