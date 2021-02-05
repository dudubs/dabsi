import Lazy from "@dabsi/common/patterns/lazy";
import { Once } from "@dabsi/common/patterns/Once";
import { Cli } from "@dabsi/modules/Cli";
import LoaderModule from "@dabsi/modules/LoaderModule";
import { Module } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
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

  protected _buildWebpack() {
    const platforms = ["common", "view", "browser"];

    const outDir = path.posix.join(
      this.projectModule.mainProject.srcDir,
      "__virtual__"
    );

    const getTsPath = fsPath =>
      this.projectModule.mainProject.configPaths.getTsPath(fsPath, outDir)!;

    const platformDirs = this.loaderModule.loadedDirs
      .toSeq()
      .flatMap(dir =>
        platforms.toSeq().map(platform => path.join(<string>dir, platform))
      )
      .filter(dir => this.loaderModule.isDir(dir))
      .toArray();

    const indexFiles = platformDirs
      .toSeq()
      .map(dir => this.loaderModule.getIndexFile(dir))
      .filter(x => !!x)
      .concat(this.viewModule.commonFiles.toSeq())
      .map(getTsPath);

    const testFiles = platformDirs
      .toSeq()
      .flatMap(dir => {
        const testsDir = path.join(dir, "tests");
        if (!this.loaderModule.isDir(testsDir)) return [];

        return this.loaderModule
          .readDir(testsDir)
          .toSeq()
          .filter(name => /(Tests||[\\\/]index)\.tsx?$/.test(name))
          .map(name => path.join(testsDir, name));
      })
      .map(getTsPath);

    const entries = {
      index: path.posix.join(outDir, "index.ts"),
      tests: path.posix.join(outDir, "tests.ts"),
    };

    return {
      entries,
      virtualFiles: {
        [entries.index]: indexFiles
          .map(tsPath => `import "${tsPath}";\n`)
          .join(""),
        [entries.tests]: testFiles
          .map(
            tsPath => `describe("${tsPath}", ()=>{ require("${tsPath}") });\n`
          )
          .join(""),
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
    const { entries, virtualFiles } = this._buildWebpack();

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
