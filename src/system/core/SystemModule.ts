import { Immutable, ImmutableSet, Seq } from "@dabsi/immutable2";
import { inspect } from "@dabsi/logging/inspect";
import { DABSI_CURRENT_PATH } from "./../../index";
import { relativePosixPath } from "@dabsi/modules/pathHelpers";
import path, { join } from "path";
import fs from "fs";
import catchError from "@dabsi/common/async/catchError";

import { touchMap } from "@dabsi/common/map/touchMap";
import { touchSet } from "@dabsi/common/map/touchSet";
import { mapObject } from "@dabsi/common/object/mapObject";
import { values } from "@dabsi/common/object/values";
import { Lazy } from "@dabsi/common/patterns/lazy";
import nested from "@dabsi/common/string/nested";
import { LogLevel } from "@dabsi/logging/Logger";
import { Cli } from "@dabsi/modules/Cli";
import { ExpressModule } from "@dabsi/modules/ExpressModule";
import { getSession } from "@dabsi/system-old/server/acl/getSession";
import { SystemRpc, SystemRpcPath } from "@dabsi/system/core/common/SystemRpc";
import { DbModule } from "@dabsi/system/core/DbModule";
import { SessionModule } from "@dabsi/system/core/SessionModule";
import { SystemSession } from "@dabsi/system/core/SystemSession";
import { DataEntitySource } from "@dabsi/typedata/data-entity/DataEntitySource";
import { DataRow } from "@dabsi/typedata/DataRow";
import { Inject, Module } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { Resolver } from "@dabsi/typedi/Resolver";
import { AnyRpc, RpcError } from "@dabsi/typerpc/Rpc";
import { AnyRpcMap, RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";
import {
  isRpcConfigResolver,
  RpcConfigResolver,
  RpcContextResolver,
} from "@dabsi/typerpc/RpcConfigResolver";
import { RpcNamespace } from "@dabsi/typerpc/RpcNamespace";
import { WidgetMap } from "@dabsi/typerpc/widget/widget-map/WidgetMap";
import { WidgetNamespace } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamspace";
import CookieParser from "cookie-parser";
import express from "express";
import { InputMap } from "./../../typerpc/input/input-map/InputMap";
import { AnyRpcWithMap } from "./../../typerpc/Rpc";
import { ProjectModule } from "./../../typestack/ProjectModule";
import { Once } from "@dabsi/common/patterns/Once";
import SystemCoreModule from "@dabsi/system/core";

@Module({
  dependencies: [SessionModule, SystemCoreModule],
})
export class SystemModule {
  log = log.get("SYSTEM");

  @Lazy() get sources() {
    return {
      sessions: DataEntitySource.create(
        SystemSession,
        this.dbModule.getConnection
      ),
    };
  }

  protected _rpcConfigResolverMap = new Map<
    AnyRpc,
    RpcConfigResolver<AnyRpc>
  >();

  protected _rpcCreatedConfigResolverMap = new Map();

  protected _isChecking = false;

  cli = new Cli()
    .command(
      "check",
      new Cli().install({
        run: async ({ traceSystem, trace = traceSystem }) => {
          this.log("checking..");
          trace && this.log.setLevel(x => x | LogLevel.TRACE);
          await this._checkSystem();
        },
      })
    )
    .command(
      "make [path]",
      new Cli().install({
        run: () => {
          return this._make();
        },
      })
    );

  constructor(
    @Inject() expressModule: ExpressModule,
    @Inject() protected mRunner: ModuleRunner,
    @Inject() protected dbModule: DbModule,
    @Inject() cli: Cli,
    @Inject() protected projectModule: ProjectModule
  ) {
    cli.command("system", this.cli);

    expressModule.install({
      run: () => this._checkSystem(),
      routes: app => {
        const handlers = [express.json(), CookieParser()];

        app.post(SystemRpcPath, async (req, res) => {
          const log = this.log.get("RPC");
          for (const handler of handlers) {
            await new Promise(next => handler(req, res, next));
          }
          const session = await getSession({
            source: this.sources.sessions,
            cookie: req.cookies["system"],
            setCookie(value: string) {
              res.cookie("system", value);
            },
          });

          const context = Resolver.createContext(
            {
              ...DataRow(SystemSession).provide(() => session),
              ...RpcContextResolver.provide(() => context),
            },
            this.requestContext
          );

          const { path, payload } = req.body;

          log.info(
            i =>
              `${(path as any[])
                .toSeq()
                .map(path =>
                  typeof path === "object" ? JSON.stringify(path) : path
                )
                .join("/")}`
          );

          const config = catchError(
            ResolveError,
            () => {
              const configResolver = this.getRpcConfigResolver(SystemRpc);
              return Resolver.resolve(configResolver, context);
            },
            error => {
              throw new RpcError(error.message);
            }
          );
          const command = await SystemRpc.createRpcCommand(config);

          res.json({
            result: await command(path, payload),
          });
        });
      },
    });
  }
  @Lazy()
  protected get requestContext() {
    return Object.setPrototypeOf(
      {
        ...SystemSession.provide(),
      },
      this.mRunner.context
    );
  }

  protected _createRpcChildrenResolvers(rpc: AnyRpc) {
    let message = "";

    const resolvers = mapObject(rpc.children, (child, childKey) => {
      try {
        return this.getRpcConfigResolver(child as AnyRpc);
      } catch (error) {
        if (error instanceof ResolveError) {
          message += `${
            message ? `\nAlso at` : `At`
          } key '${childKey}':${nested(error.message)}`;
          return;
        }
        throw error;
      }
    });

    if (message) {
      throw new ResolveError(message);
    }
    return resolvers as Record<string, RpcConfigResolver<AnyRpc>>;
  }

  protected _createRpcNamespaceConfigResolver(rpc: RpcNamespace) {
    return RpcConfigResolver(rpc, this._createRpcChildrenResolvers(rpc), c => ({
      getNamespaceConfig: (childRpc, key) => {
        if (!(key in c)) {
          throw new ResolveError(
            `No config for ${key} ${childRpc.rpcType?.name}. ${Object.keys(
              rpc.children
            )}`
          );
        }
        return c[key];
      },
    }));
  }

  protected _createWidgetNamespaceConfigResolver(rpc: WidgetNamespace) {
    return RpcConfigResolver(
      rpc,
      this._createRpcChildrenResolvers(rpc.children.ns),
      c => ({
        getNamespaceConfig: (childRpc, key) => {
          if (!(key in c)) {
            throw new ResolveError(`No config for ${key}`);
          }
          return c[key];
        },
      })
    );
  }

  protected _createAnyRpcWithMapConfigResolver(rpc: AnyRpcWithMap) {
    return RpcConfigResolver(
      rpc,
      this._createRpcChildrenResolvers(rpc.children.map),
      c => $ => $(c)
    );
  }

  protected _createRpcMapConfigResolver(rpc: AnyRpcMap) {
    return RpcConfigResolver(
      rpc,
      this._createRpcChildrenResolvers(rpc),
      c => $ => $(c)
    );
  }

  createRpcConfigResolver<T extends AnyRpc>(rpc: T) {
    return touchMap(this._rpcCreatedConfigResolverMap, rpc, () => {
      switch (rpc.rpcType) {
        case RpcNamespace:
          return <any>this._createRpcNamespaceConfigResolver(<any>rpc);
        case WidgetNamespace:
          return <any>this._createWidgetNamespaceConfigResolver(<any>rpc);
        case RpcMap:
          return <any>this._createRpcMapConfigResolver(<any>rpc);
        case WidgetMap:
        case InputMap:
          return <any>this._createAnyRpcWithMapConfigResolver(<any>rpc);
      }
      if (rpc.options.isConfigCanBeUndefined) {
        return RpcConfigResolver(rpc, {}, () => $ => $(undefined));
      }
    });
  }

  getRpcConfigResolver<T extends AnyRpc>(rpc: T): RpcConfigResolver<T> {
    return <any>touchMap(
      this._rpcConfigResolverMap,
      rpc,
      (): RpcConfigResolver<T> => {
        const configResolver = this.createRpcConfigResolver(rpc);
        if (configResolver) return configResolver;

        throw new ResolveError(
          `No config resolver ${rpc.rpcType?.name}, ${rpc.options.isConfigCanBeUndefined}`
        );
      }
    );
  }

  protected _checkNsConfig(rpc: RpcNamespace, context) {
    const configResolver = this.getRpcConfigResolver(rpc);
    Resolver.check(configResolver, context);
  }

  protected _make() {}

  configureRpcResolver(configResolver: RpcConfigResolver<AnyRpc>) {
    this._rpcConfigResolverMap.set(configResolver.rpc, configResolver);
  }
  protected async _checkSystem() {
    this._isChecking = true;
    await this.loadSystem();
    try {
      const configResolver = this.getRpcConfigResolver(SystemRpc);
      Resolver.check(configResolver, this.requestContext);
    } catch (error) {
      if (error instanceof ResolveError) {
        this.log.error(error.toString());
        return;
      }
      throw error;
    } finally {
      this._isChecking = false;
    }
  }

  _loadedDirs: Set<string>;
  _loadedConfigsInfo: {
    nodeModule: NodeModule;
    resolver: RpcConfigResolver<AnyRpc>;
  }[];

  @Lazy() get indexFileNames() {
    const fileNames = new Set<string>();
    for (const info of this._loadedConfigsInfo) {
      const rpcModule = info.nodeModule.children.find(child => {
        return Seq.Keyed(child.exports).find(x => {
          return (
            x === info.resolver.rpc || (x as any)?.[0] === info.resolver.rpc
          );
        });
      });

      if (!rpcModule?.filename) {
        this.log.warn(() => `No found rpc file for ${info.resolver}`);
      } else {
        fileNames.add(rpcModule?.filename);
      }
    }
    return [...fileNames];
  }

  protected async _loadSystemConfig(configFileName: string) {
    const configModule = require(configFileName);
    const configResolver = configModule?.default;
    if (isRpcConfigResolver(configResolver)) {
      this.log.trace(() => `Load config ${inspect(configResolver)}`);
      this._loadedConfigsInfo.push({
        nodeModule: require.cache[require.resolve(configFileName)]!,
        resolver: configResolver,
      });
      this.configureRpcResolver(configResolver);
    } else {
      this.log.trace(() => `No default config "${configFileName}".`);
    }
  }

  protected async _loadSystemDir(dir: string) {
    if (!touchSet(this._loadedDirs, dir)) return;

    this.log.trace(() => `Scan dir ${dir}.`);
    let configFiles: string[] = [];
    let fileNames = new Set();

    for (const baseName of await fs.promises.readdir(dir)) {
      const fileName = path.join(dir, baseName);
      const state = await fs.promises.stat(fileName);
      if (state.isDirectory()) {
        await this._loadSystemDir(fileName);
        continue;
      } else if (/Config\.ts$/.test(fileName)) {
        await this._loadSystemConfig(fileName);
      }
    }
  }

  @Once() async loadSystem() {
    this.log.trace("Load system.");
    await this.projectModule.init();
    this._loadedDirs = new Set();
    this._loadedConfigsInfo = [];

    for (const projectInfo of values(this.projectModule.projectInfoMap)) {
      for (const projectModuleInfo of values(projectInfo.moduleMapInfo)) {
        await this._loadSystemDir(projectModuleInfo.dir);
      }
    }
  }
}
