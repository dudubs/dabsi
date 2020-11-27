import express from "express";
import { Connection } from "typeorm";
import { Lazy } from "../../common/patterns/lazy";
import { ExpressModule } from "../../modules/ExpressModule";
import { AclRequest } from "../../system-old/server/acl/AclRequest";
import { Inject, Module, ModuleProvider, Resolver } from "../../typedi";
import { Consumer } from "../../typedi/Consumer";
import { ModuleRunner } from "../../typedi/ModuleRunner";
import { AnyRpc, RpcError } from "../../typerpc/Rpc";
import { RpcConfigResolver } from "../../typerpc/RpcConfigResolver";
import { SystemRpc, SystemRpcPath } from "./common/SystemRpc";
import { SystemRpcConfig } from "./server/SystemRpcConfig";
import { SessionModule } from "./SessionModule";
import { SystemRequest } from "./SystemRequest";

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

  @Lazy()
  protected get configMap(): Map<AnyRpc, RpcConfigResolver<AnyRpc>> {
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
      },
      this.mRunner.context
    );
  }

  getConfig(rpc: AnyRpc): RpcConfigResolver<AnyRpc> {
    return this.configMap.get(rpc)!;
  }

  constructor(
    @Inject() expressModule: ExpressModule,
    @Inject() protected mRunner: ModuleRunner
  ) {
    expressModule.push({
      run: () => {
        for (const resolver of this.configMap.values()) {
          Resolver.check(
            Resolver.catch(resolver, error => {
              this.log.error(error);
            }),
            this.requestContext
          );
        }
      },
      routes: app => {
        const json = express.json();
        app.post(SystemRpcPath, async (req, res) => {
          await new Promise(next => json(req, res, next));
          const context = Object.create(this.requestContext);
          const session = await req.getSession();
          const connection = Resolver.resolve(Connection, context);
          const aclReq = new AclRequest(connection, session.$key);

          const sysReq = new SystemRequest(this, context);

          Resolver.provide(
            context,
            AclRequest.provide(() => aclReq),
            SystemRequest.provide(() => sysReq)
          );

          const payload = req.body;

          const config = sysReq.getUnresolvedConfig(SystemRpc);
          const command = await SystemRpc.createRpcCommand(config);
          if (!(await aclReq.ask())) {
            throw new RpcError(`Access denied.`);
          }
          res.json(await command(payload));
        });
      },
    });
  }

  configure(rpcConfigResolver: RpcConfigResolver<AnyRpc>) {
    this.configMap.set(rpcConfigResolver.rpc, rpcConfigResolver);
  }
}
