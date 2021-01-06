import { mapObject } from "@dabsi/common/object/mapObject";
import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import { values } from "@dabsi/common/object/values";
import Lazy from "@dabsi/common/patterns/lazy";
import { Once } from "@dabsi/common/patterns/Once";
import {
  DABSI_CURRENT_PATH,
  DABSI_PATH,
  DABSI_ROOT_DIR,
  DABSI_SRC_PATH,
} from "@dabsi/index";
import { Cli } from "@dabsi/modules/Cli";
import ExpressModule from "@dabsi/modules/express";
import LoaderModule from "@dabsi/modules/LoaderModule";
import { relativePosixPath } from "@dabsi/modules/pathHelpers";
import ProjectPlatformInfo from "@dabsi/modules/ProjectPlatformInfo";
import { Inject, Module } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { DevModule } from "@dabsi/typestack/DevModule";
import { MakeModule } from "@dabsi/typestack/MakeModule";
import ProjectModule from "@dabsi/typestack/ProjectModule";
import fs from "fs";
import * as path from "path";
import tsConfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import webpack from "webpack";

@Module({
  dependencies: [DevModule, ExpressModule],
})
export default class BrowserModule {
  scripts: string[] = [];

  log = log.get("BROWSER");

  constructor(
    @Inject() protected projectModule: ProjectModule,
    @Inject() protected makeModule: MakeModule,
    @Inject() protected runner: ModuleRunner,
    @Inject() cli: Cli,
    @Inject() protected loaderModule: LoaderModule
  ) {
    cli.command("browser", cli =>
      cli.command("pack", cli => cli.onRun({ after: () => this.pack() }))
    );

    makeModule.onMake(() => this.make());
  }

  // borwser platform info for each project
  projectPlatformInfoMap!: Record<string, ProjectPlatformInfo>;

  mainProjectPlatformInfo!: ProjectPlatformInfo;

  @Once() async init() {
    await this.projectModule.load();
    this.projectPlatformInfoMap = mapObject(
      this.projectModule.projectMapInfo,
      p => new ProjectPlatformInfo(p, "browser")
    );
    this.mainProjectPlatformInfo = this.projectPlatformInfoMap[
      this.projectModule.mainProject.dir
    ];
  }

  get rootProjectPlatformInfo(): ProjectPlatformInfo {
    return this.projectPlatformInfoMap[DABSI_PATH];
  }

  protected async _makeProjectModules(
    projectPlatformInfo: ProjectPlatformInfo
  ) {
    this.log.trace(
      () => `Make project directory "${projectPlatformInfo.projectInfo.dir}".`
    );
    for (const projectModuleInfo of values(
      projectPlatformInfo.projectInfo.moduleInfoMap
    )) {
      this.log.trace(
        () => `Make project module directory "${projectModuleInfo.dir}".`
      );
      const platformModuleDir = path.join(
        projectModuleInfo.dir,
        projectPlatformInfo.name
      );

      if (!(await this.loaderModule.isDir(platformModuleDir))) continue;

      const indexFileName = await this.loaderModule.getIndexFile(
        platformModuleDir
      );
      if (!indexFileName) continue;
      this._indexFileNames!.add(indexFileName);

      if (/[\\\/]index\.tsx?$/.test(indexFileName)) {
        const testsFileName = await this.loaderModule.getIndexFile(
          path.join(platformModuleDir, "tests")
        );
        testsFileName && this._testsFileNames!.add(testsFileName);
      }

      const platformModuleTsConfigFileName = path.join(
        platformModuleDir,
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
          platformModuleDir,
          projectPlatformInfo.tsConfigFileName
        ),
      });
    }
  }

  protected async _makeConfigs() {
    for (const projectPlatformInfo of values(this.projectPlatformInfoMap)) {
      this.log.trace(
        () =>
          `Make platform ${relativePathToCurrent(
            projectPlatformInfo.projectInfo.dir
          )}`
      );

      await this._makeProjectModules(projectPlatformInfo);
    }

    const baseConfig = {
      extends: relativePosixPath(
        this.mainProjectPlatformInfo.projectInfo.tsConfigsDir,
        path.join(
          this.rootProjectPlatformInfo.projectInfo.tsConfigsDir,
          "tsconfig.base.browser.json"
        )
      ),
      compilerOptions: {
        ...this.projectModule.mainTsConfigPaths.getConfigForDir(
          this.mainProjectPlatformInfo.projectInfo.tsConfigsDir
        ),
      },
    };

    const getIncludes = (xs: string[]) =>
      mapObjectToArray(
        this.projectPlatformInfoMap,
        value => value.projectInfo.srcDir
      )
        .toSeq()
        .flatMap(dir => xs.toSeq().map(x => path.join(dir, "**", x)))
        .map(x =>
          relativePosixPath(
            this.mainProjectPlatformInfo.projectInfo.tsConfigsDir,
            x
          )
        )
        .toArray();

    await this.makeModule.makeJsonFile(
      this.mainProjectPlatformInfo.tsConfigFileName,
      {
        ...baseConfig,
        include: getIncludes(["common", "view", "browser"]),
      }
    );

    await this.makeModule.makeJsonFile(
      path.join(
        this.mainProjectPlatformInfo.tsConfigFileName.replace(
          "tsconfig.",
          "tsconfig.prod."
        )
      ),
      {
        ...baseConfig,
        include: ["../src/**/browser"],
      }
    );
  }
  _indexFileNames: Set<string> | null = null;
  _testsFileNames: Set<string> | null = null;

  protected *_getRelativeImportNames(fileNames: Iterable<string>) {
    for (const fileName of fileNames) {
      yield {
        fileName,
        importName: this.projectModule.mainTsConfigPaths.getTsPath(
          fileName,
          this.mainProjectPlatformInfo.generatedDir
        ),
      };
    }
  }
  protected _generatedImports() {
    return (
      this.mainProjectPlatformInfo.generatedIndexFileName,
      `import "${this.projectModule.mainTsConfigPaths.getTsPath(
        path.join(DABSI_SRC_PATH, "browser/register"),
        this.mainProjectPlatformInfo.generatedDir
      )}";\n`
    );
  }
  protected async _makeIndexFile() {
    let code = ``;

    for (const { importName } of this._getRelativeImportNames(
      this._indexFileNames!
    )) {
      code += `import "${importName}";\n`;
    }

    await this.makeModule.makeFile(
      this.mainProjectPlatformInfo.generatedIndexFileName,
      this._generatedImports() + code
    );
  }

  protected async _makeTestsFile() {
    let code = ``;
    for (const { importName } of this._getRelativeImportNames(
      this._testsFileNames!
    )) {
      code += `describe("${importName}", ()=>{ require("${importName}") });\n`;
    }
    await this.makeModule.makeFile(
      this.mainProjectPlatformInfo.generatedTestsFileName,
      this._generatedImports() + code
    );
  }

  async make() {
    await this.init();
    await this.projectModule.loadTsConfigPaths();

    this._indexFileNames = new Set();
    this._testsFileNames = new Set();
    // await this.hooks.make();
    await this._makeConfigs();

    await this.projectModule.onBuildCommonFiles.invoke(commonFileName => {
      this._indexFileNames?.add(commonFileName);
    });

    await this._makeIndexFile();
    await this._makeTestsFile();

    this._indexFileNames = null;
    this._testsFileNames = null;
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
        path: this.mainProjectPlatformInfo.bundleDir,
      },
      entry: {
        index: this.mainProjectPlatformInfo.generatedIndexFileName,
        tests: this.mainProjectPlatformInfo.generatedTestsFileName,
      },
      stats: {
        warnings: false,
        colors: true,
      },
      resolve: {
        // symlinks: false,
        plugins: [
          // @ts-expect-error
          new tsConfigPathsWebpackPlugin(),
        ],
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
              configFile: this.mainProjectPlatformInfo.tsConfigFileName,
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

  @Lazy() get webpackCompiler() {
    return webpack(this.webpackConfig);
  }

  protected _runWebpackAgain = false;

  runWebpackCompiler() {
    if (this.webpackCompiler.running) {
      this._runWebpackAgain = true;
      return;
    }
    this.webpackCompiler.run((...args) => {
      if (this._runWebpackAgain) {
        this._runWebpackAgain = false;
        this.runWebpackCompiler();
      }
      this.webpackCallback(...args);
    });
  }

  protected async pack() {
    await this.init();
    this.runWebpackCompiler();
  }
}

function relativePathToCurrent(path: string) {
  return relativePosixPath(DABSI_ROOT_DIR, path);
}
