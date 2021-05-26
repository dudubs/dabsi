import AsyncProcess from "@dabsi/common/async/AsyncProcess";
import {
  CliBuilder,
  CliExtenderFn,
  CliRunnerFn,
  CliWrapperFn,
} from "@dabsi/typecli/CliBuilder";
import { CliMetadata } from "@dabsi/typecli/CliMetadata";
import { Resolver } from "@dabsi/typedi";
import { Module } from "@dabsi/typemodule";
import ModuleMetadata from "@dabsi/typemodule/ModuleMetadata";
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
    const process = new AsyncProcess();

    const rootBuilder = new CliBuilder(getPromise => {
      process.push(() => getPromise());
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
        moduleMetadata.args.options.cli
      );

      const instance = this.moduleRunner.get(target);

      targetBuilder.extenders.push(...cliMetadata.argumentBuilders);
      targetBuilder.runners.push(args =>
        run(args, cliMetadata.argumentPropertyNames)
      );

      const run = async (args, propertyNames: Set<string>) => {
        for (const propertyName of propertyNames) {
          await Resolver.Injectability.invoke(
            instance,
            Resolver.Context.create(this.moduleRunner.context, [args]),
            propertyName
          );
        }
      };

      for (const commandMetadata of cliMetadata.commandMap.values()) {
        const commandBuilder = locateBuilder(
          targetBuilder,
          commandMetadata.name
        );
        commandBuilder.declarations.push(...commandMetadata.declarations);
        commandBuilder.extenders.push(...commandMetadata.builders);
        commandBuilder.runners.push(async args => {
          await run(args, cliMetadata.argumentPropertyNames);
          await run(args, commandMetadata.propertyNames);
        });
      }
    }

    for (const extender of this._extenders) {
      extender(rootBuilder);
    }
    return rootBuilder;
  }

  run(args: any[]) {
    this.moduleRunner.lock();

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
  }
}
