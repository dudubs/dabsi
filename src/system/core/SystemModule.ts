import { Lazy } from "@dabsi/common/patterns/lazy";
import { Once } from "@dabsi/common/patterns/Once";
import nested from "@dabsi/common/string/nested";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { LogLevel } from "@dabsi/logging/Logger";
import { Cli } from "@dabsi/modules/Cli";
import { HooksInstaller } from "@dabsi/modules/HooksInstaller";
import CoreSystemModule from "@dabsi/system/core";
import { DbModule } from "@dabsi/system/core/DbModule";
import { SessionModule } from "@dabsi/system/core/SessionModule";
import { Inject, Module } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import ProjectManager from "@dabsi/typestack/ProjectManager";
import ProjectModule from "@dabsi/typestack/ProjectModule";
import express from "express";
import { CallStackInfo } from "./../../typedi/CallStackInfo";
import { Resolver } from "./../../typedi/Resolver";
import { AnyResolverMap } from "./../../typedi/resolvers/ObjectResolver";

export interface SystemProvider {
  getHandler();
}
declare global {
  namespace Express {
    interface Request {
      systemContext: AnyResolverMap;
    }
  }
}
@Module({
  dependencies: [SessionModule, CoreSystemModule],
})
export class SystemModule {
  log = log.get("SYSTEM");

  cli = new Cli().command(
    "check",
    new Cli().install({
      run: async ({ traceSystem, trace = traceSystem }) => {
        await this.load();

        this.log("checking..");
        for (const resolver of this._handlerResolvers) {
          try {
            Resolver.check(resolver, this.requestContext);
          } catch (error) {
            if (error instanceof ResolveError) {
              this.log.error(error.message);
              return;
            }
            throw error;
          }
        }

        trace && this.log.setLevel(x => x | LogLevel.TRACE);
        await this.hooks.check();
      },
    })
  );

  protected _handlerResolvers: Resolver<express.Handler>[] = [];

  use(...resolvers: [string, Resolver<express.Handler>][]): this {
    const callStackInfo = new CallStackInfo(new Error(), __filename);

    for (const [index, [description, resolver]] of resolvers.entries()) {
      this._handlerResolvers.push(
        Resolver.catch(resolver, error => {
          throw new ResolveError(
            `At ${description} #${index}, ${callStackInfo.description}:${nested(
              error.message
            )}`
          );
        })
      );
    }

    return this;
  }

  createHandler(): express.Handler {
    let handler: express.Handler = (req, res, next) => {
      res.send("No handler.");
    };
    for (const resolver of this._handlerResolvers) {
      const nextHandler = Resolver.resolve(resolver, this.requestContext);
      const prevHandler = handler;
      handler = (req, res, next) => {
        nextHandler(req, res, () => {
          prevHandler(req, res, next);
        });
      };
    }
    return (req, res, next) => {
      Object.defineProperty(req, "systemContext", {
        configurable: false,
        value: Object.create(this.requestContext),
      });
      next();
    };
  }

  constructor(
    @Inject() protected runner: ModuleRunner,
    @Inject() public readonly dbModule: DbModule,
    @Inject() cli: Cli,
    @Inject() protected projectManager: ProjectManager
  ) {
    cli.command("system", this.cli);
  }

  protected hooks = {
    loadProjectModule: HooksInstaller.empty as (
      projectModule: ProjectModule
    ) => Awaitable,

    loadIndexFiles: HooksInstaller.empty as (
      callback: (indexFileName: string) => Awaitable
    ) => Awaitable,

    check: HooksInstaller.empty as () => Awaitable,
  };
  install = HooksInstaller(this.hooks);

  @Once() async load() {
    this.log.trace("Load system .");
    await this.projectManager.init();
    for (const projectModule of this.projectManager.allProjectModules) {
      await this.hooks.loadProjectModule(projectModule);
    }
  }

  @Once() async getIndexFileNames(): Promise<Set<string>> {
    await this.load();
    const fileNames = new Set<string>();
    await this.hooks.loadIndexFiles(fileName => {
      fileNames.add(fileName);
    });
    return fileNames;
  }

  @Lazy()
  get requestContext(): AnyResolverMap {
    return Object.create(this.runner.context);
  }
}
