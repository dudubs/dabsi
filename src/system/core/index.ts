import { Lazy } from "@dabsi/common/patterns/lazy";
import { Once } from "@dabsi/common/patterns/Once";
import nested from "@dabsi/common/string/nested";
import { LogLevel } from "@dabsi/logging/Logger";
import { Cli } from "@dabsi/modules/Cli";
import { DbModule } from "@dabsi/modules/DbModule";
import { Inject, Module } from "@dabsi/typedi";
import { CallStackInfo } from "@dabsi/typedi/CallStackInfo";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { AnyResolverMap, Resolver } from "@dabsi/typedi";
import ProjectModule from "@dabsi/typestack/ProjectModule";
import express from "express";

declare global {
  namespace Express {
    interface Request {
      systemContext: AnyResolverMap;
    }
  }
}

@Module({})
export class SystemModule {
  log = log.get("SYSTEM");

  cli = new Cli().command(
    "check",
    new Cli().onRun(async ({ traceSystem, trace = traceSystem }) => {
      trace && this.log.setLevel(x => x | LogLevel.TRACE);
      await this.check();
    })
  );

  async check() {
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

    // await this.hooks.check();
  }

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
      next();
    };
    for (const resolver of this._handlerResolvers) {
      const prevHandler = handler;
      const nextHandler = Resolver.resolve(resolver, this.requestContext);

      handler = (req, res, next) => {
        prevHandler(req, res, () => {
          nextHandler(req, res, next);
        });
      };
    }
    return (req, res, next) => {
      Object.defineProperty(req, "systemContext", {
        configurable: false,
        value: Object.create(this.requestContext),
      });
      handler(req, res, next);
    };
  }

  constructor(
    @Inject() protected runner: ModuleRunner,
    @Inject() public readonly dbModule: DbModule,
    @Inject() cli: Cli,
    @Inject() protected projectManager: ProjectModule
  ) {
    cli.command("system", this.cli);
  }

  @Once() async load() {
    this.log.trace("Load system .");
    await this.projectManager.load();
    for (const projectModule of this.projectManager.allProjectModuleEntitys) {
      // await this.hooks.loadProjectModuleEntity(projectModule);
    }
  }

  @Once() async getIndexFileNames(): Promise<Set<string>> {
    await this.load();
    const fileNames = new Set<string>();
    // await this.hooks.loadIndexFiles(fileName => {
    //   fileNames.add(fileName);
    // });
    return fileNames;
  }

  @Lazy()
  get requestContext(): AnyResolverMap {
    return Object.create(this.runner.context);
  }
}
