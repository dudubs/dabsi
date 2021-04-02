import { AsyncProcess } from "@dabsi/common/async/AsyncProcess";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { CliBuilder, CliBuilderFn } from "@dabsi/typecli/CliBuilder";
import { CliMetadata } from "@dabsi/typecli/CliMetadata";
import { Resolver } from "@dabsi/typedi";
import { Module } from "@dabsi/typemodule";
import { ModuleMetadata } from "@dabsi/typemodule/ModuleMetadata";
import { ModuleRunner } from "@dabsi/typemodule/ModuleRunner";
import yargs from "yargs";

@Module()
export class CliModule2 {
  readonly wrappers: ((execute: () => Promise<void>) => Promise<void>)[] = [];
  readonly builders: ((cliBuilder: CliBuilder) => void)[] = [];

  constructor(protected moduleRunner: ModuleRunner) {}

  extend(
    path: string,
    builderFn: CliBuilderFn,
    runnerFn?: (args) => Awaitable
  ): this {
    this.builders.push((builder: CliBuilder | undefined) => {
      for (const key of path.split(".")) {
        builder = builder!.get(key);
        if (!builder) return this;
      }
      builder?.builders.push(builderFn);
      runnerFn && builder?.runners.push(runnerFn);
      return this;
    });
    return this;
  }

  build(): { builder: CliBuilder; process: AsyncProcess } {
    const process = new AsyncProcess();

    const rootBuilder = new CliBuilder(promise => {
      process.push(promise);
    });

    const locateBuilder = (
      builder: CliBuilder,
      path: string | undefined
    ): CliBuilder => {
      if (!path) return builder;
      for (const key of path.split(".")) {
        builder = builder.touch(key);
      }
      return builder;
    };

    for (const target of this.moduleRunner.loadedModules) {
      const cliMetadata = CliMetadata.map.get(target);
      if (!cliMetadata) continue;
      const moduleMetadata = ModuleMetadata.get(target);

      const targetBuilder = locateBuilder(
        rootBuilder,
        moduleMetadata.options.cli
      );

      const instance = this.moduleRunner.get(target);
      for (const cliCommandMetadata of cliMetadata.commandMap.values()) {
        const commandBuilder = locateBuilder(
          targetBuilder,
          cliCommandMetadata.name
        );

        commandBuilder.builders.push(y => {
          for (const builders of [
            cliMetadata.argumentBuilders,
            cliCommandMetadata.builders,
          ]) {
            for (const builder of builders) {
              y = builder(y);
            }
          }

          return y;
        });

        commandBuilder.runners.push(async args => {
          for (const propertyNames of [
            // first - invoke arguments
            cliMetadata.argumentPropertyNames,
            // after - invoke commands
            cliCommandMetadata.propertyNames,
          ]) {
            await Promise.all(
              propertyNames
                .toSeq()
                .map(propertyName =>
                  Resolver.Injectability.resolve(
                    instance,
                    Resolver.Context.create(this.moduleRunner.context, [args]),
                    propertyName
                  )
                )
                .toArray()
            );
          }
        });
      }
    }
    return { builder: rootBuilder, process };
  }

  run(scriptName: string, args: any[]) {
    const { builder, process } = this.build();
    builder.build(yargs(args)).help().exitProcess(false).scriptName(scriptName)
      .argv;
    return process.wait();
  }
}
