import yargs from "yargs";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Module } from "@dabsi/typedi";
import { Hookable } from "@dabsi/modules/Hookable";
import { touchSet } from "@dabsi/common/map/touchSet";
import { touchObject } from "../common/object/touchObject";

@Module()
export class Cli {
  protected _cliMap: Record<string, Cli> = {};

  command(name: string, buildCli: (cli: Cli) => void): Cli {
    const cli: Cli = touchObject(this._cliMap, name, () => {
      const cli = new Cli();
      cli.onRunAsParent(args => {
        return this.onRunAsParent.invoke(args);
      });
      this.onBuild(y =>
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
      return cli;
    });
    buildCli(cli);
    return this;
  }

  onRunAsParent = Hookable<(args: any) => Awaitable>();
  onRun = Hookable<(args: any) => Awaitable>();
  onBuild = Hookable<(args: any) => Awaitable>();

  args?: any;

  async main(y: yargs.Argv) {
    await this.onBuild.invoke(y);
    return await this.run(y.help().argv);
  }

  async run(args) {
    try {
      this.args = args;
      await this.onRun.invoke(args);
    } catch (error) {
      if (error instanceof CliError) {
        log.error(error.message);
        return;
      }
      throw error;
    }
  }
}

export class CliError extends Error {}
