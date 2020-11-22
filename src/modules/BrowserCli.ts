import path from "path";
import webpack from "webpack";
import { NODE_MODULES_PATH } from "../system/server/cli/createBrowserWebpack";
import { Inject } from "../typedi/Inject";
import { Module } from "../typedi/Module";
import { Builder } from "./Builder";
import { Cli } from "./Cli";

export class WebpackBuilder extends Builder<webpack.Configuration> {}

@Module()
export class BrowserCli extends Cli {
  webpackConfig: webpack.Configuration;
  packCli = new Cli();

  webpackBuilder = new WebpackBuilder();

  constructor(@Inject() cli: Cli) {
    super();
    cli.connect("browser", this);

    this.connect(
      "pack",
      this.packCli.push({
        build: y => y.boolean(["w", "watch"]),
        run: ({ w, watch = w }) => {
          this.init();
          return () => {
            console.log(this.includedFileNames);
            console.log("x");
          };
        },
      })
    );
  }

  includedFileNames: string[];
  webpackConfigEntries: Record<string, string>;

  protected init() {
    this.includedFileNames = [];
    this.webpackConfigEntries = {};
    this.webpackConfig = {
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
        path: path.resolve(process.env.TYPESTACK_PATH!, "bundle/browser"),
      },
      entry: this.webpackConfigEntries,
      stats: {
        warnings: false,
      },
      resolve: {
        symlinks: false,
        alias: {
          // ...getAliases(),
          // dabsi: resolve(__dirname, "..", "dabsi-src"),
        },
        modules: [NODE_MODULES_PATH],
        extensions: [".ts", ".tsx", ".js"],
      },
    };
  }

  include(fileName: string) {
    this.includedFileNames.push(fileName);
  }
}
