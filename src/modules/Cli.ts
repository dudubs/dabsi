import yargs from "yargs";
import { pushAsyncHook } from "../common/async/pushAsyncHook";
import { Awaitable } from "../common/typings2/Async";
import { Module } from "../typedi/Module";

@Module()
export class Cli {
  connect(name: string, cli: Cli): this {
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
            console.log({ name });
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

  push(options: {
    build?(yargs: yargs.Argv): yargs.Argv;
    run?(args): Awaitable<(() => void) | void>;
    runAsParent?(args): Awaitable;
    lastRun?: (args) => Awaitable;
  }) {
    pushAsyncHook(this.hooks, "run", options.run);
    pushAsyncHook(this.hooks, "lastRun", options.lastRun, true);
    pushAsyncHook(this.hooks, "runAsParent", options.runAsParent);

    const {
      hooks: { build: prevBuild },
    } = this;
    const { build: nextBuild } = options;
    nextBuild && (this.hooks.build = y => nextBuild(prevBuild(y)));
    return this;
  }
}

export class CliError extends Error {}
