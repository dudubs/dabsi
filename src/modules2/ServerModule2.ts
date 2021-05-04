import { AsyncProcess2 } from "@dabsi/common/async/AsyncProcess2";
import { Once } from "@dabsi/common/patterns/Once";
import { LoaderModule2 } from "@dabsi/modules2/LoaderModule2";
import { RequestBuilder } from "@dabsi/modules2/RequestBuilder";
import { CliCommand } from "@dabsi/typecli";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import { Module } from "@dabsi/typemodule";
import { ModuleRunner } from "@dabsi/typemodule/ModuleRunner";
import { join } from "path";

export interface StartArgs {
  port?: number;
}
export interface StopArgs {}

@Module({})
export class ServerModule2 {
  readonly starters: ((args: Partial<StartArgs>) => Promise<void>)[] = [];

  readonly stoppers: ((args: Partial<StopArgs>) => Promise<void>)[] = [];

  readonly request = new RequestBuilder();

  constructor(
    protected loaderModule: LoaderModule2,
    protected moduleRunner: ModuleRunner
  ) {}

  @Once() async load() {
    console.log("loading server");

    const loadObject = async o => {
      if (!o) return;
      if (Array.isArray(o)) {
        return Promise.all(o.toSeq().map(o => loadObject(o)));
      }

      if (!o[getServerLoaderSymbol]) return;

      const resolver = o[getServerLoaderSymbol]();

      await Resolver.resolve(resolver, this.moduleRunner.context);
    };

    await Promise.all(
      this.loaderModule.getLoadedDirectories().map(async dir => {
        for (const baseName of await this.loaderModule.readDir(dir)) {
          if (!baseName.startsWith("_")) continue;

          const path = join(dir, baseName);
          if (!(await this.loaderModule.isFile(path))) continue;

          loadObject(require(path)?.default);
        }
      })
    );

    console.log("server is loaded.");
  }

  @CliCommand("check")
  async check() {
    await this.load();
  }

  @CliCommand("start", y =>
    y.option("port", { type: "number", alias: "p", default: 7777 })
  )
  async start(args: Partial<StartArgs> = {}) {
    await this.load();
    await Promise.all(this.starters.toSeq().map(starter => starter(args)));
  }

  @CliCommand("stop")
  async stop(args: Partial<StopArgs> = {}) {
    await this.load();
    await Promise.all(this.stoppers.map(stopper => stopper(args)));
  }

  processRequest(
    context: ResolverMap,
    callback: (context: ResolverMap) => Promise<void>
  ): Promise<void> {
    const process = new AsyncProcess2();

    return this.request.process(
      Resolver.Context.assign(context, [process]),
      async context => {
        await process.waitFor(() => callback(context));
      }
    );
  }
}

export class ServerRequestBuilder extends Resolver(
  [ServerModule2],
  x => x.request
) {}

const getServerLoaderSymbol = Symbol("getServerLoader");

export namespace ServerModule2 {
  export function defineServerLoader<T>(
    type: T,
    getResolver: (value: T) => Resolver<void>
  ) {
    type[getServerLoaderSymbol] = function () {
      return getResolver(this);
    };
  }
}
