import express from "express";
import { entries } from "../../common/object/entries";
import { ExpressModule } from "../../modules/ExpressModule";
import { Inject, Module, Resolver } from "../../typedi";
import { ModuleRunner } from "../../typedi/ModuleRunner";
import { ResolveError } from "../../typedi/ResolveError";
import { AnyRpc, RpcError } from "../../typerpc/Rpc";
import { RpcConfigResolver } from "../../typerpc/RpcConfigResolver";
import { SystemRpc } from "./common/SystemRpc";
import CookieParser from "cookie-parser";
@Module()
export class SystemModule {
  log = log.get("SYSTEM");

  protected configMap = new Map<AnyRpc, RpcConfigResolver<AnyRpc>>();

  context = {};

  constructor(
    @Inject() mExpress: ExpressModule,
    @Inject() protected mRunner: ModuleRunner
  ) {
    Object.setPrototypeOf(this.context, mRunner.context);
    mExpress.push({
      run: () => {
        for (const [key, rpc] of entries(SystemRpc.targetMap)) {
          const configResolver = this.configMap.get(rpc);
          if (!configResolver) {
            this.log.warn(() => `No config resovler for key "${key}"`);
          }
          try {
            Resolver.check(configResolver!, this.context);
          } catch (error) {
            if (error instanceof ResolveError) {
              this.log.error(
                `Cant resolve system rpc at:${key}, ${error.message}`
              );
              return;
            }
            throw error;
          }
        }
      },
      build: (app) => {
        const json = express.json();
        const cookieParser = CookieParser();
        app.post(SystemRpc.path, async (req, res) => {
          await new Promise((next) => cookieParser(req, res, next));

          const context = Object.create(this.context);

          await new Promise((next) => json(req, res, next));
          const [key, payload] = req.body;

          const rpc = SystemRpc.targetMap[key];
          if (!rpc) throw new RpcError(`No system rpc for key "${key}".`);

          const configResolver = this.configMap.get(rpc);
          if (!configResolver)
            throw new RpcError(`No config resolver for system rpc "${key}".`);

          const config = Resolver.resolve(configResolver, context);
          const handler = await rpc.resolveRpcHandler(config);

          res.json(await handler.handle(payload));
        });
      },
    });
  }

  configure(rpcConfigResolver: RpcConfigResolver<AnyRpc>) {
    this.configMap.set(rpcConfigResolver.rpc, rpcConfigResolver);
  }
}
