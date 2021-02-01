import { values } from "@dabsi/common/object/values";
import Lazy from "@dabsi/common/patterns/lazy";
import { DABSI_ROOT_DIR, DABSI_SRC_PATH } from "@dabsi/index";
import { Cli } from "@dabsi/modules/Cli";
import { CommonPlatformModule } from "@dabsi/modules/CommonPlatformModule";
import ExpressModule from "@dabsi/modules/express";
import LoaderModule from "@dabsi/modules/LoaderModule";
import { relativePosixPath } from "@dabsi/modules/pathHelpers";
import ProjectPlatformInfo from "@dabsi/modules/ProjectPlatformInfo";
import { Module } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { DevModule } from "@dabsi/typestack/DevModule";
import { MakeModule } from "@dabsi/typestack/MakeModule";
import ProjectModule from "@dabsi/typestack/ProjectModule";
import * as path from "path";
import tsConfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import webpack from "webpack";
import { PlatformModule, PlatformModuleContext } from "../PlatformModule";
import { ViewPlatformModule } from "../ViewPlatformModule";

@Module({
  dependencies: [DevModule, ExpressModule],
})
export default class BrowserPlatformModule extends PlatformModule {
  scripts: string[] = [];

  log = log.get("BROWSER");

  constructor(
    protected projectModule: ProjectModule,
    protected makeModule: MakeModule,
    protected runner: ModuleRunner,
    protected loaderModule: LoaderModule,
    protected commonPlatformModule: CommonPlatformModule,
    protected viewPlatformModule: ViewPlatformModule,
    context: PlatformModuleContext,
    cli: Cli
  ) {
    super(context, "browser", [commonPlatformModule, viewPlatformModule]);
    cli.command("browser", cli =>
      cli.command("pack", cli => cli.onRun({ after: () => this.pack() }))
    );
  }

  protected async _makeProjectModules(
    projectPlatformModule: ProjectPlatformInfo
  ) {
    this.log.trace(
      () => `Make project directory "${projectPlatformModule.project.dir}".`
    );
    for (const projectModuleInfo of values(
      projectPlatformModule.project.moduleMap
    )) {
      this.log.trace(
        () => `Make project module directory "${projectModuleInfo.dir}".`
      );
      const platformModuleDir = path.join(
        projectModuleInfo.dir,
        projectPlatformModule.name
      );

      if (!(await this.loaderModule.isDir(platformModuleDir))) continue;

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
          projectPlatformModule.configFileName
        ),
      });
    }
  }

  protected async _makeConfigs() {
    for (const project of this.projectModule.projects) {
      this.log.trace(
        () => `Make platform ${relativePathToCurrent(project.dir)}`
      );

      await this._makeProjectModules(project.getPlatformInfo("browser"));
    }

    const baseConfig = {
      extends: relativePosixPath(
        this.projectModule.mainProject.configsDir,
        path.join(
          this.projectModule.mainProject.configsDir,
          "tsconfig.base.browser.json"
        )
      ),
      compilerOptions: {
        ...this.mainProjectPlatform.project.configPaths.getConfigForDir(
          this.projectModule.mainProject.configsDir
        ),
      },
    };

    const getPlatformFiles = (platformName: string[]) =>
      this.projectModule.projects
        .toSeq()
        .map(p => p.srcDir)
        .flatMap(dir =>
          platformName //
            .toSeq()
            .map(x => path.join(dir, "**", x))
        )
        .map(x =>
          relativePosixPath(this.mainProjectPlatform.project.configsDir, x)
        )
        .toArray();

    await this.makeModule.makeJsonFile(
      this.mainProjectPlatform.configFileName,
      {
        ...baseConfig,
        include: getPlatformFiles(["common", "view", "browser"]),
      }
    );

    await this.makeModule.makeJsonFile(
      path.join(
        this.mainProjectPlatform.configFileName.replace(
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

  webpackCallback = (err, stats) => {
    if (stats) {
      this.log.info(stats.toString(this.webpackConfig.stats));
    }
  };

  @Lazy() get makeInfo() {
    return {};
  }

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
        tests: this.mainProjectPlatform.generatedTestsFileName,
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
          // // TODO: @dabsi
        },
        extensions: [".ts", ".tsx", ".js"],
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            options: {
              configFile: this.mainProjectPlatform.configFileName,
              transpileOnly: true,
              compilerOptions: {
                noEmit: false,
              },
            },
          },
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
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
    this.runWebpackCompiler();
  }
}

function relativePathToCurrent(path: string) {
  return relativePosixPath(DABSI_ROOT_DIR, path);
}
