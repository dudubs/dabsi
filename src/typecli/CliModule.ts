import { AsyncProcess2 } from "@dabsi/common/async/AsyncProcess2";
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
  protected _extenders: ((cliBuilder: CliBuilder) => void)[] = [];

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
    this._extenders.push(builder => {
      if (path) {
        for (const key of path.split(".")) {
          builder = builder.get(key)!;
          if (!builder) return;
        }
      }
      extender && builder.extenders.push(extender);
      wrapper && builder.wrappers.push(wrapper);
      runner && builder.runners.push(runner);
    });
  }

  build(): CliBuilder {
    const process = new AsyncProcess2();

    const rootBuilder = new CliBuilder(getPromise => {
      process.push(() => `${this.constructor.name}.Runner`, getPromise);
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

        commandBuilder.declarations.push(...cliCommandMetadata.declarations);

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
            for (const propertyName of propertyNames) {
              const { invoke } = Resolver.Injectability.resolve(
                instance,
                Resolver.Context.create(this.moduleRunner.context, [args]),
                propertyName
              );
              this.moduleRunner.process.waitAndPush(
                () => `CliCommand<${target.name}.${propertyName}>`,
                async () => invoke()
              );
            }
          }
        });
      }
    }

    for (const extender of this._extenders) {
      extender(rootBuilder);
    }
    return rootBuilder;
  }

  run(args: any[]) {
    this.build()
      //
      .build(yargs(args))
      .middleware(argv => {
        argv.$args = args;
      })
      .help()
      .exitProcess(false)
      .strict()
      .scriptName("ts").argv;

    this.moduleRunner.process.waitToEnd();
  }
}
