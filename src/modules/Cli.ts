import yargs from "yargs";
import { Awaitable } from "../common/typings2/Async";
import { Module } from "../typedi";
import { HooksInstaller } from "./HooksInstaller";

@Module()
export class Cli {
  command(name: string, cli: Cli): Cli {
    cli.install({
      runAsParent: args => {
        return this.hooks.runAsParent(args);
      },
    });
    return this.install({
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
    build: (y: yargs.Argv) => y,
  };

  install = HooksInstaller(this.hooks, this);

  args?: any;

  async main(y: yargs.Argv) {
    return this.run(this.hooks.build(y).help().argv);
  }

  async run(args) {
    this.args = args;
    await this.hooks.run(args);
  }
}

export class CliError extends Error {}
