import { AsyncProcess2 } from "@dabsi/common/async/AsyncProcess2";
import { entries } from "@dabsi/common/object/entries";
import { values } from "@dabsi/common/object/values";
import { Once } from "@dabsi/common/patterns/Once";
import { DABSI_SRC_DIR } from "@dabsi/env";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import {
  isRpcResolver,
  RpcMemberResolver,
  RpcResolver,
} from "@dabsi/modules/rpc/RpcResolver";
import { RpcResolverBuilder } from "@dabsi/modules/rpc/RpcResolverBuilder";
import { ExpressModule2 } from "@dabsi/modules2/ExpressModule2";
import { LoaderModule2 } from "@dabsi/modules2/LoaderModule2";
import { PlatformModule2 } from "@dabsi/modules2/PlatformModule2";
import { RequestBuilder } from "@dabsi/modules2/RequestBuilder";
import { CliCommand } from "@dabsi/typecli";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import { Module, Plugin } from "@dabsi/typemodule";
import { ModuleRunnerContext } from "@dabsi/typemodule/ModuleRunner";
import { createRpcCommandFromHandler } from "@dabsi/typerpc2/createRpcCommandFromHandler";
import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { RpcType } from "@dabsi/typerpc2/Rpc";
import express from "express";
import multer from "multer";
import path from "path";

@Module({ cli: "rpc" })
export class RpcModule2 {
  log = log.get("RPC");

  protected resolverBuilder = new RpcResolverBuilder();

  readonly request = new RequestBuilder();

  constructor(
    protected loaderModule: LoaderModule2,
    protected process: AsyncProcess2
  ) {}

  installContext(@Plugin() context: ModuleRunnerContext) {
    Resolver.Context.assign(context, [this.resolverBuilder]);
  }

  async installPlatform(@Plugin() platformModule2: PlatformModule2) {
    const viewFilePattern = path.join(DABSI_SRC_DIR, "typerpc2/**/*view.ts");
    platformModule2.viewLibs.add(viewFilePattern).add(viewFilePattern + "x");

    platformModule2.serverLibs.add(path.join(DABSI_SRC_DIR, "typerpc"));

    platformModule2
      .getPlatform("common")
      .loaders.push(({ platform, baseName, fileName }) => {
        if (baseName === "rpc.ts") {
          platform.indexFileNames.add(fileName);
        }
      });
  }

  configure(config: RpcResolver<any> | RpcMemberResolver<any> | undefined) {
    if (Array.isArray(config)) {
      for (const configItem of config) {
        this.configure(configItem);
      }
      return;
    }
    if (isRpcResolver(config)) {
      this.resolverBuilder.add(config);
      return;
    }
  }

  @Once()
  protected _loadConfigs() {
    //
    this.loaderModule.pushLoader(
      () => this.constructor.name,
      async dir => {
        for (const baseName of await this.loaderModule.readDir(dir)) {
          if (!/config\.ts$/i.test(baseName)) continue;
          const configFileName = path.join(dir, baseName);
          this.configure(require(configFileName).default);
        }
      }
    );
  }

  @CliCommand("check") check(rpc: RpcType, context: ResolverMap) {
    context = Resolver.Context.create(context, [RpcRequest]);
    Resolver.check(this.resolverBuilder.getResolver(rpc), context);
  }

  async processRequest(
    rpcType: RpcType,
    rpcRequest: RpcRequest,
    context: ResolverMap
  ): Promise<any> {
    context = Resolver.Context.assign(context, [rpcRequest]);
    let result: any;
    await this.request.process(context, async () => {
      const configuratorResolver = this.resolverBuilder.getResolver(rpcType);
      const configurator = Resolver.resolve(configuratorResolver, context);
      const handler = await createRpcHandler(rpcType, configurator);
      const command = createRpcCommandFromHandler(rpcType, handler);
      result = await command(rpcRequest.payload);
    });
    return result;
  }

  processMultipleRequests(
    rpcType: RpcType,
    payloads: any[],
    body: any,
    context: ResolverMap
  ): Promise<any[]> {
    this.log.info(() => `process ${payloads.length} payloads.`);

    return Promise.all(
      payloads
        .toSeq()
        .map(async payload =>
          this.processRequest(
            rpcType,
            new RpcRequest(payload, body),
            Resolver.Context.create(context)
          )
        )
    );
  }

  protected _serveMap: Record<string, RpcType> = {};

  serve(path: string, rpcType: RpcType) {
    if (this._serveMap[path])
      throw new Error(`Can't override rpc-serve-path "${path}".`);
    this._serveMap[path] = rpcType;
  }

  installExpress(
    @Plugin() expressModule: ExpressModule2,
    context: ModuleRunnerContext
  ) {
    expressModule.builders.push(app => {
      for (const [path, rpcType] of entries(this._serveMap)) {
        app.post(
          path,
          express.json(),
          express.urlencoded({ extended: true }),
          multer().any(),
          expressModule.processRequest(context, async (req, res, context) => {
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

            res.json({
              responses: await this.processMultipleRequests(
                rpcType,
                payloads,
                body,
                context
              ),
            });
          })
        );
      }
    });
  }
}
