import { entries } from "@dabsi/common/object/entries";
import { Once } from "@dabsi/common/patterns/Once";
import TableMap from "@dabsi/common/TableMap";
import { DABSI_SRC_DIR } from "@dabsi/env";
import ExpressModule from "@dabsi/modules/ExpressModule";
import LoaderModule from "@dabsi/modules/LoaderModule";
import PlatformModule from "@dabsi/modules/PlatformModule";
import { RequestBuilder } from "@dabsi/modules/RequestBuilder";
import RpcLocationContext from "@dabsi/modules/rpc/RpcLocationContext";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import { BaseRpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { RpcResolverGenerator } from "@dabsi/modules/rpc/RpcResolverGenerator";
import ServerModule from "@dabsi/modules/ServerModule";
import { CliCommand } from "@dabsi/typecli";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import { Module, Plugin } from "@dabsi/typemodule";
import { ModuleRunnerContext } from "@dabsi/typemodule/ModuleRunner";
import { createRpcCommandFromHandler } from "@dabsi/typerpc2/createRpcCommandFromHandler";
import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { RpcType } from "@dabsi/typerpc2/Rpc";
import RpcPathMap from "@dabsi/typerpc2/RpcPathMap";
import express from "express";
import multer from "multer";
import path from "path";

@Module({ cli: "rpc" })
export default class RpcModule {
  log = log.get("RPC");

  protected _resolverGenerator = new RpcResolverGenerator();

  readonly _locationContextMap = new RpcPathMap<ResolverMap>();

  protected _locationContextMapCache = new Map<
    RpcType<any>,
    TableMap<ResolverMap>
  >();

  protected _serveMap: Record<string, RpcType> = {};

  readonly request = new RequestBuilder();

  constructor(protected loaderModule: LoaderModule) {}

  installContext(@Plugin() context: ModuleRunnerContext) {
    Resolver.Context.assign(context, [this._resolverGenerator]);
  }

  async installPlatform(@Plugin() platformModule: PlatformModule) {
    const libPath = path.join(DABSI_SRC_DIR, "typerpc2");

    const viewFilePattern = path.join(libPath, "**/*view.ts");

    platformModule.viewLibs.add(viewFilePattern).add(viewFilePattern + "x");

    platformModule.serverLibs.addAll([
      path.join(libPath, "**/*handler.ts"),
      path.join(libPath, "**/*Handler.ts"),
    ]);

    platformModule
      .getPlatform("common")
      .loaders.push(({ platform, baseName, fileName }) => {
        if (baseName === "rpc.ts") {
          platform.indexFileNames.push(fileName);
        }
      });
  }

  @Once()
  protected _loadConfigs() {
    //
    this.loaderModule.pushDirectoryLoader(async dir => {
      for (const baseName of await this.loaderModule.readDir(dir)) {
        if (!/config\.ts$/i.test(baseName)) continue;
        const configFileName = path.join(dir, baseName);
        this._resolverGenerator.add(require(configFileName).default);
      }
    });
  }

  @CliCommand("check") check(rpc: RpcType, context: ResolverMap) {
    context = Resolver.Context.create(context, [RpcRequest]);
    Resolver.check(this._resolverGenerator.getResolver(rpc), context);
  }

  getLocationContext(rpcType: RpcType, path: string[]): ResolverMap {
    return this._locationContextMapCache
      .touch(rpcType, () => new TableMap())
      .touch(path, () => {
        const context = {};
        for (const childContext of this._locationContextMap.findPrefix(
          rpcType,
          path
        )) {
          Object.assign(context, childContext);
        }

        return context;
      });
  }

  async processRequest(
    rpcType: RpcType,
    rpcRequest: RpcRequest,
    context: ResolverMap
  ): Promise<any> {
    context = Resolver.Context.create(
      context,
      this.getLocationContext(
        rpcType,
        rpcRequest.payload.filter(item => typeof item === "string")
      )
    );

    return this.request.process(
      Resolver.Context.assign(context, [rpcRequest]),
      async () => {
        const configuratorResolver = this._resolverGenerator.getResolver(
          rpcType
        );

        const configurator = Resolver.resolve(configuratorResolver, context);
        const handler = await createRpcHandler(rpcType, configurator);
        const command = createRpcCommandFromHandler(rpcType, handler);
        return await command(rpcRequest.payload);
      }
    );
  }

  processMultipleRequests(
    rpcType: RpcType,
    payloads: any[],
    body: any,
    context: ResolverMap
  ): Promise<any[]> {
    this.log.info(() => `process ${payloads.length} payloads.`);

    return Promise.all(
      payloads.map(async payload =>
        this.processRequest(
          rpcType,
          new RpcRequest(payload, body),
          Resolver.Context.create(context)
        )
      )
    );
  }

  serve(path: string, rpcType: RpcType) {
    if (this._serveMap[path])
      throw new Error(`Can't override rpc-serve-path "${path}".`);
    this._serveMap[path] = rpcType;
  }

  installExpress(
    @Plugin() expressModule: ExpressModule,
    context: ModuleRunnerContext
  ) {
    expressModule.builders.push(app => {
      for (const [path, rpcType] of entries(this._serveMap)) {
        app.post(
          path,
          express.json(),
          express.urlencoded({ extended: true }),
          multer().any(),
          (req, res) => {
            const body = { ...req.body };
            if (Array.isArray(req.files)) {
              for (const { fieldname, buffer } of req.files) {
                body[fieldname] = buffer;
              }
            }
            const payloads: any[] =
              typeof body.payloads === "string"
                ? JSON.parse(body.payloads)
                : body.payloads;

            return expressModule.processRequest(
              context,
              req,
              res,
              async context => {
                res.json({
                  responses: await this.processMultipleRequests(
                    rpcType,
                    payloads,
                    body,
                    context
                  ),
                });
              }
            );
          }
        );
      }
    });
  }
}

ServerModule.defineLoader(BaseRpcResolver, rpcResolver =>
  Resolver([RpcResolverGenerator], rb => {
    rb.add(rpcResolver);
  })
);

ServerModule.defineLoader(RpcLocationContext.prototype, rpcLocationContext =>
  Resolver([RpcModule], rpcModule => {
    rpcModule._locationContextMap.update(
      rpcLocationContext.location.rpcRootType,
      rpcLocationContext.location.path,
      context => ({ ...context, ...rpcLocationContext.context })
    );
  })
);
