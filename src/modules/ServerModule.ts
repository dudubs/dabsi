import AsyncProcess from "@dabsi/common/async/AsyncProcess";
import { Once } from "@dabsi/common/patterns/Once";
import { DABSI_SRC_DIR } from "@dabsi/env";
import LoaderModule from "@dabsi/modules/LoaderModule";
import MakeModule from "@dabsi/modules/MakeModule";
import { RequestBuilder } from "@dabsi/modules/RequestBuilder";
import { CliCommand } from "@dabsi/typecli";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import { Module } from "@dabsi/typemodule";
import { ModuleRunner, ModuleTarget } from "@dabsi/typemodule/ModuleRunner";
import { spawn } from "node:child_process";
import { ChildProcess } from "node:child_process";
import path from "path";
import { join } from "path";

const __ServerLoaderSymbol = Symbol("ServerLoader");

export interface StartArgs {
  port?: number;
}
export interface StopArgs {}

@Module({
  cli: "server",
})
export default class ServerModule {
  readonly starters: ((args: Partial<StartArgs>) => Promise<void>)[] = [];

  readonly stoppers: ((args: Partial<StopArgs>) => Promise<void>)[] = [];

  readonly request = new RequestBuilder();

  readonly log = log.get("SERVER");

  constructor(
    protected loaderModule: LoaderModule,
    protected moduleRunner: ModuleRunner
  ) {}

  @Once() async load() {
    this.log("loading..");

    const loadObject = async o => {
      if (!o) return;
      if (Array.isArray(o)) {
        return Promise.all(o.toSeq().map(o => loadObject(o)));
      }

      if (!o[__ServerLoaderSymbol]) return;
      const resolver = o[__ServerLoaderSymbol]();
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

    this.log("loaded.");
  }

  @CliCommand("check")
  async check() {
    await this.load();
  }

  @CliCommand("start", y =>
    y.option("port", {
      type: "number",
      alias: "p",
      default: process.env.PORT || 5000,
    })
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
    const process = new AsyncProcess();

    return this.request.process(
      Resolver.Context.assign(context, [process]),
      async context => {
        await process.waitFor(() => callback(context));
      }
    );
  }

  static defineServerLoader<T>(
    type: T,
    getResolver: (value: T) => Resolver<void>
  ) {
    type[__ServerLoaderSymbol] = function () {
      return getResolver(this);
    };
  }
}
