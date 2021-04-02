import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { entries } from "@dabsi/common/object/entries";
import Lazy from "@dabsi/common/patterns/lazy";
import { Once } from "@dabsi/common/patterns/Once";
import { inspect } from "@dabsi/logging/inspect";
import { Cli } from "@dabsi/modules/Cli";
import LoaderModule from "@dabsi/modules/LoaderModule";
import { Module } from "@dabsi/typedi";
import { OldModuleRunner as ModuleRunner } from "@dabsi/typedi/OldModuleRunner";
import ProjectModule from "@dabsi/typestack/ProjectModule";
import * as path from "path";
import tsConfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import webpack from "webpack";
import WebpackVirtualModulesPlugin from "webpack-virtual-modules";
import { ViewModule } from "./ViewModule";

@Module()
export default class BrowserModule {
  scripts: string[] = [];

  log = log.get("BROWSER");

  constructor(
    protected projectModule: ProjectModule,
    protected runner: ModuleRunner,
    protected loaderModule: LoaderModule,
    protected viewModule: ViewModule,
    cli: Cli
  ) {
    cli.command("browser", cli =>
      cli.command("pack", cli => cli.onRun({ after: () => this.pack() }))
    );
  }

  protected _buildEntriesAndVirtualFiles() {
    const platforms = ["common", "view", "browser"];

    const virtualDir = path.posix.join(
      this.projectModule.mainProject.srcDir,
      "__virtual__"
    );

    const platformFilesMap: Record<
      string,
      {
        tests: string[];
        indexes: string[];
      }
    > = {};

    const findTestsFiles = (
      testsDir: string,
      callback: (fileName: string) => void
    ) => {
      if (!this.loaderModule.isDir(testsDir)) return;

      for (const baseName of this.loaderModule.readDir(testsDir)) {
        if (!/(Tests||[\\\/]index)\.tsx?$/.test(baseName)) continue;
        callback(path.join(testsDir, baseName));
      }
    };

    for (const platform of platforms) {
      const platformFiles = (platformFilesMap[platform] = {
        tests: [] as string[],
        indexes: [] as string[],
      });

      for (const loadedDir of this.loaderModule.loadedDirs) {
        const platformDir = path.join(loadedDir, platform);
        const platformTestsDir = path.join(platformDir, "tests");

        const indexFiles = this.loaderModule.findIndexFiles(platformDir);

        if (indexFiles) {
          platformFiles.indexes.push(...indexFiles);
        }
        findTestsFiles(platformTestsDir, fileName => {
          platformFiles.tests.push(fileName);
        });
      }
    }

    const getTsPath = fsPath =>
      this.projectModule.mainProject.configPaths.getTsPath(fsPath, virtualDir)!;

    const entryMap = {
      index: path.posix.join(virtualDir, "index.ts"),
      tests: path.posix.join(virtualDir, "tests.ts"),
    };

    const indexCode: string[] = [
      "const l = m => {" +
        " if (typeof m.initmodule==='function')" +
        " m.initmodule(m)?.forEach(l); " +
        "};",
    ];
    const testsCode: string[] = [];

    for (const [platform, platformFiles] of entries(platformFilesMap)) {
      [indexCode, testsCode].forEach(code => {
        code.push(`// ${platform} platform`);
      });

      for (const indexFileName of platformFiles.indexes) {
        indexCode.push(
          `l(require(${JSON.stringify(getTsPath(indexFileName))}));`
        );
      }
      for (const testsFileName of platformFiles.tests) {
        const tsPath = JSON.stringify(getTsPath(testsFileName));
        testsCode.push(`describe(${tsPath},()=> { require(${tsPath}) });`);
      }
    }

    return {
      entries: entryMap,
      virtualFiles: {
        [entryMap.index]: indexCode.join("\n"),
        [entryMap.tests]: testsCode.join("\n"),
      },
    };
  }

  webpackCompiler: webpack.Compiler | null = null;

  @Once() async initWebpack() {
    await this.viewModule.load();
    const config = await this._getWebpackConfig();
    this.webpackCompiler = webpack(config);
  }

  webpackCallback = (err, stats) => {
    if (stats) {
      this.log.info(stats.toString({ warnings: false, colors: true }));
    }
  };

  protected async _getWebpackConfig(): Promise<webpack.Configuration> {
    const { entries, virtualFiles } = this._buildEntriesAndVirtualFiles();

    const virtualModules = new WebpackVirtualModulesPlugin(virtualFiles);

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
      plugins: [virtualModules],
      output: {
        path: path.join(this.projectModule.mainProject.bundleDir, "browser"),
      },
      entry: {
        ...entries,
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
              configFile: path.join(
                this.projectModule.mainProject.configsDir,
                `tsconfig.browser.json`
              ),
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

  protected _runWebpackAgain = false;

  async compile() {
    await this.initWebpack();
    await this.viewModule.load();
    if (this.webpackCompiler!.running) {
      this._runWebpackAgain = true;
      return;
    }
    this.webpackCompiler!.run((...args) => {
      if (this._runWebpackAgain) {
        this._runWebpackAgain = false;
        this.compile();
      }
      this.webpackCallback(...args);
    });
  }

  protected async pack() {
    this.compile();
  }
}
