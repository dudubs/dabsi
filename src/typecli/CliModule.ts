import { AsyncProcess } from "@dabsi/common/async/AsyncProcess";
import { Awaitable } from "@dabsi/common/typings2/Async";
import {
  CliBuilder,
  CliExtenderFn,
  CliRunnerFn,
  CliWrapperFn,
} from "@dabsi/typecli/CliBuilder";
import { CliMetadata } from "@dabsi/typecli/CliMetadata";
import { Resolver } from "@dabsi/typedi";
import { Module } from "@dabsi/typemodule";
import { ModuleMetadata } from "@dabsi/typemodule/ModuleMetadata";
import { ModuleRunner } from "@dabsi/typemodule/ModuleRunner";
import yargs from "yargs";

declare module "@dabsi/typemodule/ModuleMetadata" {
  interface ModuleOptions {
    cli?: string;
  }
}
@Module()
export class CliModule2 {
  readonly builders: ((cliBuilder: CliBuilder) => void)[] = [];

  constructor(protected moduleRunner: ModuleRunner) {}

  extend({
    path,
    wrapper,
    runner,
    extender,
  }: {
    path?: string;
    wrapper?: CliWrapperFn;
    runner?: CliRunnerFn;
    extender?: CliExtenderFn;
  }) {
    this.builders.push(builder => {
      if (path) {
        for (const key of path.split(".")) {
          builder = builder.touch(key);
        }
      }
      extender && builder.extenders.push(extender);
      wrapper && builder.wrappers.push(wrapper);
      runner && builder.runners.push(runner);
    });
  }

  build(): { builder: CliBuilder; process: AsyncProcess } {
    const process = new AsyncProcess();

    const rootBuilder = new CliBuilder(promise => {
      process.push(() => `${this.constructor.name}.Runner`, promise);
    });

    for (const extender of this.builders) {
      extender(rootBuilder);
    }

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

        commandBuilder.extenders.push(y => {
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
    builder
      //
      .build(yargs(args))
      .middleware(argv => {
        argv.$args = args;
      })
      .help()
      .exitProcess(false)
      .scriptName(scriptName).argv;
    return process.wait();
  }
}
