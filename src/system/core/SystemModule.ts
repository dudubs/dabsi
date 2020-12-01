import express from "express";
import { Connection } from "typeorm";
import { flat } from "../../common/iterator/flat";
import { entries } from "../../common/object/entries";
import { Lazy } from "../../common/patterns/lazy";
import { ExpressModule } from "../../modules/ExpressModule";
import { AclRequest } from "../../system-old/server/acl/AclRequest";
import { getSession } from "../../system-old/server/acl/getSession";
import { Session } from "../../system-old/server/acl/Session";
import { DataEntitySource } from "../../typedata/data-entity/DataEntitySource";
import { DataRow } from "../../typedata/DataRow";
import { Inject, Module, ModuleProvider, Resolver } from "../../typedi";
import { Consumer } from "../../typedi/Consumer";
import { ModuleRunner } from "../../typedi/ModuleRunner";
import { AnyRpc, RpcError } from "../../typerpc/Rpc";
import { RpcConfigResolver } from "../../typerpc/RpcConfigResolver";
import { flatRpc } from "../../typerpc/FlatRpc";
import { RpcNamespace } from "../../typerpc/RpcNamespace";
import { RpcNamespaceHandler } from "../../typerpc/RpcNamespaceHandler";
import { SystemRpc, SystemRpcPath } from "./common/SystemRpc";
import { DbModule } from "./DbModule";
import { SystemRpcConfig } from "./server/SystemRpcConfig";
import { SessionModule } from "./SessionModule";
import { SystemRequest } from "./SystemRequest";
import { SystemSession } from "./SystemSession";
import CookieParser from "cookie-parser";
export function SystemModuleProvider({
  configs,
}: {
  configs?: RpcConfigResolver<AnyRpc>[];
}): ModuleProvider {
  return Consumer([SystemModule], mSystem => {
    configs?.forEach(config => {
      mSystem.configure(config);
    });
    return {};
  });
}

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
  protected get rpcConfigResolverMap(): Map<AnyRpc, RpcConfigResolver<AnyRpc>> {
    return new Map().set(SystemRpc, SystemRpcConfig);
  }

  @Lazy()
  protected get requestContext() {
    return Object.setPrototypeOf(
      {
        ...AclRequest.provide(() => {
          throw new Error();
        }),
        ...SystemRequest.provide(() => {
          throw new Error();
        }),
        ...SystemSession.provide(() => {
          throw new Error();
        }),
      },
      this.mRunner.context
    );
  }

  getConfig(rpc: AnyRpc): RpcConfigResolver<AnyRpc> {
    return this.rpcConfigResolverMap.get(rpc)!;
  }

  constructor(
    @Inject() expressModule: ExpressModule,
    @Inject() protected mRunner: ModuleRunner,
    @Inject() protected dbModule: DbModule
  ) {
    expressModule.push({
      run: () => {
        for (const { rpc, path } of flatRpc(SystemRpc)) {
          if (rpc.options.handler !== RpcNamespaceHandler) continue;
          const rpcNs: RpcNamespace = rpc as RpcNamespace;

          for (const [key, rpc] of entries(rpcNs.children)) {
            const getChildPath = () => ["SystemRpc", ...path, key].join(".");
            const rpcConfigResolver = this.rpcConfigResolverMap.get(rpc);
            if (!rpcConfigResolver) {
              this.log.warn(
                () => `No have config resolver for "${getChildPath()}".`
              );
              continue;
            }
            Resolver.check(
              Resolver.catch(rpcConfigResolver, error => {
                this.log.error(
                  () => `At ${getChildPath()}: ${error.toString()}`
                );
              }),
              this.requestContext
            );
          }
        }
      },
      routes: app => {
        const handlers = [express.json(), CookieParser()];

        app.post(SystemRpcPath, async (req, res) => {
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

          const sysReq = new SystemRequest(this, context);

          Resolver.provide(
            context,
            AclRequest.provide(() => aclReq),
            SystemRequest.provide(() => sysReq),
            DataRow(SystemSession).provide(() => session)
          );

          const { path, payload } = req.body;

          const config = sysReq.getUnresolvedConfig(SystemRpc);
          const command = await SystemRpc.createRpcCommand(config);
          if (!(await aclReq.ask())) {
            throw new RpcError(`Access denied.`);
          }
          res.json(await command(path, payload));
        });
      },
    });
  }

  configure(rpcConfigResolver: RpcConfigResolver<AnyRpc>) {
    this.rpcConfigResolverMap.set(rpcConfigResolver.rpc, rpcConfigResolver);
  }
}
