import { Awaitable } from "@dabsi/common/typings2/Async";
import yargs from "yargs";

export type CliExtenderFn = (y: yargs.Argv<any>) => yargs.Argv<any>;
export type CliRunnerFn = (args: any) => Awaitable;
export type CliWrapperFn = (
  args: any,
  execute: () => Promise<void>,
  level: number
) => Promise<any>;

export class CliBuilder {
  protected _commandMap = new Map<string, CliBuilder>();

  readonly extenders: CliExtenderFn[] = [];

  readonly runners: CliRunnerFn[] = [];

  readonly wrappers: CliWrapperFn[] = [];

  constructor(
    protected runner: (promise: Promise<any>) => void,
    protected parent?: CliBuilder
  ) {}

  build(y: yargs.Argv<{}>): yargs.Argv<any> {
    for (const extender of this.extenders) {
      y = extender(y);
    }
    return y;
  }

  wrap(
    args: any,
    execute: () => Promise<void>,
    level: number
  ): () => Promise<void> {
    for (const wrapper of this.wrappers) {
      const prevExecute = execute;
      execute = () => wrapper(args, prevExecute, level);
    }
    if (this.parent) {
      return this.parent.wrap(args, execute, level + 1);
    }
    return execute;
  }

  execute(args) {
    return this.wrap(
      args,
      async () => {
        await Promise.all(
          this.runners.map(runner => {
            return runner(args);
          })
        );
      },
      0
    )();
  }

  get(command: string): CliBuilder | undefined {
    return this._commandMap.get(command);
  }

  touch(command: string): CliBuilder {
    return this._commandMap.touch(command, () => {
      const builder = new CliBuilder(this.runner, this);
      this.extenders.push(y => {
        return y.command(
          command,
          "",
          y => builder.build(y),
          args => {
            this.runner(builder.execute(args));
          }
        );
      });
      return builder;
    });
  }
}
