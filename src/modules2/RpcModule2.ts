import { AsyncProcess } from "@dabsi/common/async/AsyncProcess";
import { Once } from "@dabsi/common/patterns/Once";
import { DABSI_SRC_DIR } from "@dabsi/env";
import { inspect } from "@dabsi/logging/inspect";
import {
  isRpcConfigResolver,
  RpcConfigResolver,
} from "@dabsi/modules/rpc/configResolver";
import { generateRpcConfigResolver } from "@dabsi/modules/rpc/configResolverGenerator";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import { LoaderModule2 } from "@dabsi/modules2/LoaderModule2";
import { PlatformModule2 } from "@dabsi/modules2/PlatformModule2";
import { Request2 } from "@dabsi/modules2/Request2";
import { CliCommand } from "@dabsi/typecli";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { Module, Plugin } from "@dabsi/typemodule";
import { AnyRpc } from "@dabsi/typerpc/Rpc";
import path from "path";

type Configuration = RpcConfigResolver<AnyRpc> | Configuration[];
@Module({ cli: "rpc" })
export class RpcModule2 {
  log = log.get("RPC");

  protected _configResolverMap = new Map<AnyRpc, RpcConfigResolver<AnyRpc>>();

  constructor(
    protected loaderModule: LoaderModule2,
    protected process: AsyncProcess
  ) {}

  defineConfigResolver(rpcConfigResolver: RpcConfigResolver<AnyRpc>) {
    if (this._configResolverMap.has(rpcConfigResolver.rpc)) {
      throw new Error(`Can't override rpc config resolver.`);
    }
    this._configResolverMap.set(rpcConfigResolver.rpc, rpcConfigResolver);
  }

  generateConfigResolver(rpc: AnyRpc): RpcConfigResolver<AnyRpc> | undefined {
    return generateRpcConfigResolver(
      childRpc => this.getConfigResolver(childRpc),
      rpc
    );
  }

  getConfigResolver(rpc: AnyRpc): RpcConfigResolver<AnyRpc> {
    return this._configResolverMap.touch(rpc, () => {
      const configResolver = this.generateConfigResolver(rpc);
      if (configResolver) {
        return configResolver;
      }
      throw new ResolveError(`No config resolver for ${inspect(rpc)}.`);
    });
  }

  installPlatform(@Plugin() platformModule2: PlatformModule2) {
    const viewFilePattern = path.join(DABSI_SRC_DIR, "typerpc/**/*view.ts");
    platformModule2.viewLibs.add(viewFilePattern).add(viewFilePattern + "x");
  }

  configure(config: Configuration) {
    if (Array.isArray(config)) {
      for (const configItem of config) {
        this.configure(configItem);
      }
      return;
    }
    if (isRpcConfigResolver(config)) {
      this.defineConfigResolver(config);
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
          this.configure(require(configFileName));
        }
      }
    );

    return this.process.wait();
  }

  @CliCommand("check") check(rpc: AnyRpc, context: ResolverMap) {
    context = Resolver.Context.create(context, [RpcRequest]);
    const configResolver = this.getConfigResolver(rpc);
    Resolver.check(configResolver, context);
  }

  readonly request = new Request2();

  async processRequest(
    rpc: AnyRpc,
    rpcRequest: RpcRequest,
    context: ResolverMap
  ): Promise<any> {
    context = Resolver.Context.assign(context, [rpcRequest]);
    let result: any;
    await this.request.process(context, async () => {
      const configResolver = this.getConfigResolver(rpc);
      const config = Resolver.resolve(configResolver, context);
      const command = rpc.createRpcCommand(config);
      result = await command(rpcRequest.path, rpcRequest.payload);
    });
    return result;
  }

  processMultipleRequests(
    rpc: AnyRpc,
    datas: any[],
    body: any,
    context: ResolverMap
  ): Promise<any[]> {
    this.log.info(() => `Got ${datas.length} requests.`);

    return Promise.all(
      datas.toSeq().map(async ({ path, payload }) => {
        this.log.info(() => `handle ${JSON.stringify(path)}`);
        return this.processRequest(
          rpc,
          new RpcRequest(path, payload, body),
          Resolver.Context.create(context)
        );
      })
    );
  }
}
