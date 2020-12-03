import path from "path";
import webpack from "webpack";
import { DABSI_ROOT_DIR } from "../index";
import { Inject, Module } from "../typedi";
import { Cli } from "./Cli";

@Module()
export class BrowserCli extends Cli {
  webpackConfig: webpack.Configuration;
  packCli = new Cli().install({
    run: ({ w, watch = w }) => {
      return this.init();
    },
  });

  constructor(@Inject() cli: Cli) {
    super();
    cli.command("browser", this);

    this.command("pack", this.packCli);
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
        colors: true,
      },
      resolve: {
        // symlinks: false,
        alias: {
          // ...getAliases(),
          // dabsi: resolve(__dirname, "..", "dabsi-src"),
        },
        modules: [path.join(DABSI_ROOT_DIR, "node_modules")],
        extensions: [".ts", ".tsx", ".js"],
      },
    };
  }

  include(fileName: string) {
    this.includedFileNames.push(fileName);
  }
}
