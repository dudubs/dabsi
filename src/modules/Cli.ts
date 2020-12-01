import yargs from "yargs";
import { pushHook } from "../common/async/pushHook";
import { Awaitable } from "../common/typings2/Async";
import { Module } from "../typedi";

export type CliOptions = {
  build?(yargs: yargs.Argv): yargs.Argv;
  run?(args): Awaitable<(() => void) | void>;
  runAsParent?(args): Awaitable;
  lastRun?: (args) => Awaitable;
};

@Module()
export class Cli {
  command(
    name: string,
    cliOrCallbackOrOptions: Cli | ((cli: Cli) => void) | CliOptions
  ): Cli {
    let cli: Cli;
    if (typeof cliOrCallbackOrOptions == "function") {
      cli = new Cli();
      cliOrCallbackOrOptions(cli);
    } else if (cliOrCallbackOrOptions instanceof Cli) {
      cli = cliOrCallbackOrOptions;
    } else {
      cli = new Cli().push(cliOrCallbackOrOptions);
    }
    cli.push({
      runAsParent: args => {
        return this.hooks.runAsParent(args);
      },
    });
    return this.push({
      build: y =>
        y.command(
          name,
          "",
          y => cli.hooks.build(y),
          async args => {
            await this.hooks.runAsParent(args);
            await cli.run(args);
          }
        ),
    });
  }

  protected hooks = {
    runAsParent: (args): Awaitable => void 0,
    run: (args): Awaitable => void 0,
    lastRun: (args): Awaitable => void 0,
    build: (y: yargs.Argv) => y,
  };

  args?: any;

  async main(y: yargs.Argv) {
    return this.run(this.hooks.build(y).help().argv);
  }

  async run(args) {
    this.args = args;
    await this.hooks.run(args);
    await this.hooks.lastRun(args);
  }

  push(run: (args) => Awaitable): Cli;
  push(options: CliOptions): Cli;
  push(runOrOptions) {
    const options: CliOptions =
      typeof runOrOptions === "function" ? { run: runOrOptions } : runOrOptions;
    pushHook(this.hooks, "run", options.run);
    pushHook(this.hooks, "lastRun", options.lastRun, true);
    pushHook(this.hooks, "runAsParent", options.runAsParent);

    const {
      hooks: { build: prevBuild },
    } = this;
    const { build: nextBuild } = options;
    nextBuild && (this.hooks.build = y => nextBuild(prevBuild(y)));
    return this;
  }
}

export class CliError extends Error {}
