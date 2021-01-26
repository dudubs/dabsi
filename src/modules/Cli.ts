import { Awaitable } from "@dabsi/common/typings2/Async";
import { Fn } from "@dabsi/common/typings2/Fn";
import { Hookable } from "@dabsi/modules/Hookable";
import {
  AnyResolverMap,
  getParamResolverMap,
  getParamsResolvers,
  Resolver,
} from "@dabsi/typedi";
import getParameterName from "@dabsi/typedi/decorators/getParameterName";
import { Forward } from "@dabsi/typedi/Forward";
import yargs from "yargs";
import { touchObject } from "../common/object/touchObject";

const buildCliMethod = MetaMethod<(cli: Cli, context) => void>(
  Symbol("buildCli")
);

function MetaMethod<T extends Fn>(p: PropertyKey) {
  return {
    push(instance, callback: T) {
      const prev = instance[p];
      instance[p] = function () {
        prev?.apply(this, arguments);
        callback.apply(this, <any>arguments);
      };
    },
    invoke(instance, ...args: Parameters<T>) {
      instance[p]?.(...args);
    },
  };
}

export function CliCommand(name: string): MethodDecorator {
  return (target, propertyName, desc) => {
    buildCliMethod.push(target, function (this: any, cli, context) {
      for (const subName of name.split(".")) {
        cli = cli.get(subName);
      }
      cli.onRun(async () => {
        console.log(
          Reflect.getMetadata("design:paramtypes", target, propertyName),
          getParamResolverMap.map.get(target[propertyName])
        );

        const paramsResolver = Resolver.array(
          getParamsResolvers(
            Reflect.getMetadata("design:paramtypes", target, propertyName) ||
              [],
            getParamResolverMap.map.get(target[propertyName]),
            index => Forward.getParameterType(target, index, propertyName)
          ),
          index => getParameterName(target[propertyName], index)
        );

        await this[propertyName](...Resolver.resolve(paramsResolver, context));
      });
    });
  };
}

CliCommand.build = (cli: Cli, moduleInstance, context: AnyResolverMap) => {
  buildCliMethod.invoke(moduleInstance, cli, context);
};

export class Cli {
  protected _cliMap: Record<string, Cli> = {};

  get(name: string): Cli {
    return touchObject(this._cliMap, name, () => {
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
  }
  command(name: string, buildCli: (cli: Cli) => void): Cli {
    const cli: Cli = this.get(name);
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

  protected async run(args) {
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
