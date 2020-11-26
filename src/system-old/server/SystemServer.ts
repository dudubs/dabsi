import express from "express";
import { keys } from "../../common/object/keys";
import { Cli } from "../../modules/Cli";
import { ExpressModule } from "../../modules/ExpressModule";
import { ServerModule } from "../../modules/ServerModule";
import { Resolver } from "../../typedi";
import { Inject } from "../../typedi";
import { Module } from "../../typedi";
import { ModuleRunner } from "../../typedi/ModuleRunner";
import { AnyResolverMap } from "../../typedi/resolvers/ObjectResolver";
import { AnyRpc } from "../../typerpc/Rpc";
import { AnyRpcMap } from "../../typerpc/rpc-map/RpcMap";
import { RpcConfigResolver } from "../../typerpc/RpcConfigResolver";
import { RpcRequest } from "../../typerpc/RpcRequest";
import { SystemRpc } from "./SystemRpc";

@Module({ dependencies: [ExpressModule] })
export default class SystemServer {
  systemCli = new Cli();

  protected rpcNameToConfigResolverMap: Record<
    string,
    RpcConfigResolver<SystemRpc<AnyRpc>>
  > = {};

  protected context: AnyResolverMap = Object.create(this.moduleRunner.context);

  registerRpcConfig(rpcConfigResolver: RpcConfigResolver<SystemRpc<AnyRpc>>) {
    this.rpcNameToConfigResolverMap[
      rpcConfigResolver.rpc.name
    ] = rpcConfigResolver;
  }

  provide(context: AnyRpcMap) {
    Object.assign(this.context, context);
  }

  constructor(
    @Inject() cli: Cli,
    @Inject() mServer: ServerModule,
    @Inject() protected moduleRunner: ModuleRunner,
    @Inject() mExpress: ExpressModule
  ) {
    cli.connect("system", this.systemCli);

    mExpress.push({
      build: (app) => {
        const json = express.json();
        app.use("/system", async (req, res) => {
          await new Promise((next) => json(req, res, next));
          const rpcReq = new RpcRequest();
          const [name, payload] = req.body;
          const configResolver = this.rpcNameToConfigResolverMap[name];
          const config = Resolver.resolve(
            configResolver,
            Object.create(this.context)
          );
          const handler = await configResolver.rpc.resolveRpcHandler(config);
          await rpcReq.handle(() => handler.handle(payload));
        });
      },
    });
    mServer.cli.push({
      run: () => {
        for (const name of keys(SystemRpc.nameToRpcMap)) {
          const configResolver = this.rpcNameToConfigResolverMap[name];
          if (!configResolver) {
            throw new Error(`No rpc config resolver for ${name}`);
          }
          Resolver.check(configResolver, this.context);
        }
      },
    });
  }

  // system clean-system
  // SystemSession
}
