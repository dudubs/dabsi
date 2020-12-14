import CookieParser from "cookie-parser";
import express from "express";
import { Connection } from "typeorm";
import { touchMap } from "../../common/map/touchMap";
import { entries } from "../../common/object/entries";
import { mapObject } from "../../common/object/mapObject";
import { Lazy } from "../../common/patterns/lazy";
import nested from "../../common/string/nested";
import { LogLevel } from "../../logging/Logger";
import { ExpressModule } from "../../modules/ExpressModule";
import { AclRequest } from "../../system-old/server/acl/AclRequest";
import { getSession } from "../../system-old/server/acl/getSession";
import { DataEntitySource } from "../../typedata/data-entity/DataEntitySource";
import { DataRow } from "../../typedata/DataRow";
import { Inject, Module } from "../../typedi";
import { ModuleRunner } from "../../typedi/ModuleRunner";
import { AnyRpc, RpcError, RpcUnresolvedConfig } from "../../typerpc/Rpc";
import { RpcConfigResolver } from "../../typerpc/RpcConfigResolver";
import { RpcNamespace } from "../../typerpc/RpcNamespace";
import { Cli } from "./../../modules/Cli";
import { ResolveError } from "./../../typedi/ResolveError";
import { Resolver } from "./../../typedi/Resolver";
import { AnyResolverMap } from "./../../typedi/resolvers/ObjectResolver";
import { AnyRpcMap } from "./../../typerpc/rpc-map/RpcMap";
import { RpcMapHandler } from "./../../typerpc/rpc-map/RpcMapHandler";
import { RpcContextResolver } from "./../../typerpc/RpcConfigResolver";
import { RpcNamespaceHandler } from "./../../typerpc/RpcNamespaceHandler";
import { SystemRpc, SystemRpcPath } from "./common/SystemRpc";
import { DbModule } from "./DbModule";
import { SessionModule } from "./SessionModule";
import { SystemSession } from "./SystemSession";

@Module({
  dependencies: [SessionModule],
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

  @Lazy()
  protected get configResolverMap(): Map<AnyRpc, RpcConfigResolver<AnyRpc>> {
    return new Map();
  }

  @Lazy()
  protected get requestContext() {
    return Object.setPrototypeOf(
      {
        ...AclRequest.provide(() => {
          throw new Error();
        }),
        ...SystemSession.provide(() => {
          throw new Error();
        }),
      },
      this.mRunner.context
    );
  }

  protected _createRpcNamespaceConfigResolver(rpc: RpcNamespace, path) {
    return RpcConfigResolver(
      rpc,
      mapObject(rpc.children, (child, childKey) => {
        return this.getRpcConfigResolver(
          child as AnyRpc,
          path && [...path, `namespace:${childKey}`]
        );
      }),
      c => ({
        getNamespaceConfig: (rpc, key) => {
          return c[key];
        },
      })
    );
  }

  protected _createRpcMapConfigResolver(rpc: AnyRpcMap, path: null | any[]) {
    return RpcConfigResolver(
      rpc,
      mapObject(rpc.children, (child, childKey) => {
        return this.getRpcConfigResolver(
          child as AnyRpc,
          path && [...path, `map:${childKey}`]
        );
      }),
      c => $ => $(c)
    );
  }

  protected _formatCheckLog(path, message) {
    return `At ${path.join(", ")} ${nested(message)}`;
  }
  getRpcConfigResolver<T extends AnyRpc>(
    rpc: T,
    path: null | any[]
  ): RpcConfigResolver<T> {
    return <any>touchMap(
      this.configResolverMap,
      rpc,

      (): RpcConfigResolver<T> => {
        if (isRpcNamespace(rpc))
          return <any>this._createRpcNamespaceConfigResolver(rpc, path);
        if (isRpcMap(rpc))
          return <any>this._createRpcMapConfigResolver(rpc, path);
        if (path) {
          this.log.warn(this._formatCheckLog(path, "No config resolver"));
          return RpcConfigResolver(rpc, {}, () => {
            throw new ResolveError(`No config resolver.`);
          });
        }
        throw new ResolveError(
          `No config resolver. ${rpc.options.handler.name}`
        );
      }
    );
  }

  protected _checkRpcConfig(rpc: AnyRpc, context, path: any[]) {
    this.log.trace(`rpc-check ${path.join("/")} ${rpc.options.handler.name}`);

    for (const [childKey, child] of entries(rpc.children)) {
      const childContext = this._getChildContext(child, context);
      const childPath = [...path, `child:${childKey}`];
      if (isRpcNamespace(child)) {
        this._checkNsConfig(child, childContext, childPath);
      } else {
        this._checkRpcConfig(child, childContext, childPath);
      }
    }
  }

  protected _catchResolveError(
    path,
    callback: () => void
  ): boolean /* return hasError? */ {
    try {
      callback();
    } catch (error) {
      if (error instanceof ResolveError) {
        this.log.error(this._formatCheckLog(path, error.message));
        return true;
      }
      throw error;
    }
    return false;
  }
  protected _checkNsConfig(rpc: RpcNamespace, context, path: any[]) {
    this.log.trace(`ns-check ${path.join("/")}`);
    const configResolver = this.getRpcConfigResolver(rpc, path);

    if (
      this._catchResolveError(path, () =>
        Resolver.check(configResolver, context)
      )
    )
      return;

    const childContext = this._getChildContext(rpc, context);
    for (const [childKey, child] of entries(rpc.children)) {
      const childPath = [...path, `namespace:${childKey}`];
      if (isRpcNamespace(child)) {
        this._checkNsConfig(child, childContext, childPath);
      } else {
        this._checkRpcConfig(child, childContext, childPath);
        const childConfigResolver = this.getRpcConfigResolver(child, path);
        if (
          this._catchResolveError(childPath, () =>
            Resolver.check(childConfigResolver, childContext!)
          )
        )
          continue;
      }
    }
  }

  protected rpcConfigResolverChildContext = new Map<AnyRpc, AnyResolverMap>();

  protected _getChildContext(rpc, context) {
    const childContext = this.rpcConfigResolverChildContext.get(rpc);
    if (!childContext) return context;
    return Object.setPrototypeOf({ ...childContext }, context);
  }

  resolveRpcConfig<T extends AnyRpc>(
    rpc: T,
    context: AnyResolverMap
  ): RpcUnresolvedConfig<T> {
    const configResolver = this.getRpcConfigResolver(rpc, null);
    return Resolver.resolve(configResolver, context);
  }

  cli = new Cli().command(
    "check",
    new Cli().install({
      run: ({ trace }) => {
        trace && this.log.setLevel(x => x | LogLevel.TRACE);
        this.log("checking..");
        try {
          this._checkNsConfig(SystemRpc, this.requestContext, []);
        } catch (error) {
          if (error instanceof ResolveError) {
            this.log.error(error.toString());
            return;
          }
          throw error;
        }
      },
    })
  );

  constructor(
    @Inject() expressModule: ExpressModule,
    @Inject() protected mRunner: ModuleRunner,
    @Inject() protected dbModule: DbModule,
    cli: Cli
  ) {
    cli.command("system", this.cli);
    expressModule.install({
      run: () => {
        this._checkNsConfig(SystemRpc, this.requestContext, []);
      },
      routes: app => {
        const handlers = [express.json(), CookieParser()];

        app.post(SystemRpcPath, async (req, res) => {
          const log = this.log.get("RPC");
          for (const handler of handlers) {
            await new Promise(next => handler(req, res, next));
          }
          const context = Object.create(this.requestContext);
          const session = await getSession({
            source: this.sources.sessions,
            cookie: req.cookies["system"],
            setCookie(value: string) {
              res.cookie("system", value);
            },
          });

          const connection = Resolver.resolve(Connection, context);
          const aclReq = new AclRequest(connection, session.$key);

          Resolver.provide(
            context,
            AclRequest.provide(() => aclReq),
            DataRow(SystemSession).provide(() => session),
            RpcContextResolver.provide(() => context)
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

          const command = await SystemRpc.createRpcCommand(
            this.resolveRpcConfig(SystemRpc, context)
          );
          if (!(await aclReq.ask())) {
            throw new RpcError(`Access denied.`);
          }
          res.json({
            result: await command(path, payload),
          });
        });
      },
    });
  }

  configureRpcResolver(configResolver: RpcConfigResolver<AnyRpc>) {
    this.configResolverMap.set(configResolver.rpc, configResolver);
  }

  configureRpcChildContext(rpc: AnyRpc, resolverMap: AnyResolverMap) {
    const context = touchMap(
      this.rpcConfigResolverChildContext,
      rpc,
      () => ({})
    );
    Object.assign(context, resolverMap);
  }
}

function isRpcNamespace(rpc: AnyRpc): rpc is RpcNamespace {
  return rpc.options.handler === RpcNamespaceHandler;
}

function isRpcMap(rpc: AnyRpc): rpc is AnyRpcMap {
  return rpc.options.handler === RpcMapHandler;
}
