import yargs from "yargs";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Module } from "@dabsi/typedi";
import { Hookable } from "@dabsi/modules/Hookable";
import { touchSet } from "@dabsi/common/map/touchSet";

@Module()
export class Cli {
  protected commandNames = new Set();

  command(name: string, cli: Cli): Cli {
    if (!touchSet(this.commandNames, name)) {
      throw new Error("Already in use");
    }

    cli.onRunAsParent(args => {
      return this.onRunAsParent.invoke(args);
    });
    return this.onBuild(y =>
      y.command(
        name,
        "",
        y => cli.onBuild.invoke(y),
        async args => {
          await this.onRunAsParent.invoke(args);
          await cli.run(args);
        }
      )
    );
  }

  onRunAsParent = Hookable<(args: any) => Awaitable>();
  onRun = Hookable<(args: any) => Awaitable>();
  onBuild = Hookable<(args: any) => Awaitable>();

  args?: any;

  async main(y: yargs.Argv) {
    this.onBuild.invoke(y);
    return this.run(y.help().argv);
  }

  async run(args) {
    this.args = args;
    await this.onRun.invoke(args);
  }
}

export class CliError extends Error {}
