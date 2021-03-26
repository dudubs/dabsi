import { Ticker } from "@dabsi/common/async/Ticker";
import { touchMap } from "@dabsi/common/map/touchMap";
import { touchSet } from "@dabsi/common/set/touchSet";
import { generateRpcConfigResolver } from "@dabsi/modules/rpc/configResolverGenerator";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import { Module, Resolver, ResolverMap } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { AnyRpc } from "@dabsi/typerpc/Rpc";
import { RpcError } from "@dabsi/typerpc/RpcError";
import ProjectModule from "@dabsi/typestack/ProjectModule";
import fs from "fs";
import path from "path";
import { DABSI_ROOT_DIR } from "../../env";
import LoaderModule from "../LoaderModule";
import { relativePosixPath } from "../pathHelpers";
import { isRpcConfigResolver, RpcConfigResolver } from "./configResolver";


@Module()
export default class RpcModule {
  _rpcConfigResolverMap = new Map<AnyRpc, RpcConfigResolver<AnyRpc>>();

  protected _isChecking = false;

  protected _rpcCreatedConfigResolverMap = new Map();

  protected _loadedDirs = new Set<string>();

  loadedConfigs: {
    nodeModule: NodeModule;
    resolver: RpcConfigResolver<AnyRpc>;
  }[] = [];

  log = log.get("RPC");

  constructor(
    protected projectModule: ProjectModule,
    protected loaderModule: LoaderModule,
    protected runner: ModuleRunner
  ) {
    loaderModule.directoryLoaders.push(dir => this._loadDir(dir, true));
  }

  configureRpcResolver(configResolver: RpcConfigResolver<AnyRpc>) {
    if (this._rpcConfigResolverMap.has(configResolver.rpc)) {
      throw new RpcError(`Can't override config resolver.`);
    }
    this._rpcConfigResolverMap.set(configResolver.rpc, configResolver);
  }

  generateConfigResolver(rpc: AnyRpc): RpcConfigResolver<AnyRpc> | undefined {
    return generateRpcConfigResolver(
      childRpc => this.getConfigResolver(childRpc),
      rpc
    );
  }

  getConfigResolver<T extends AnyRpc>(rpc: T): RpcConfigResolver<T> {
    return <any>touchMap(
      this._rpcConfigResolverMap,
      rpc,
      (): RpcConfigResolver<T> => {
        const configResolver = this.generateConfigResolver(rpc);
        if (configResolver) {
          return configResolver as RpcConfigResolver<T>;
        }
        throw new ResolveError(
          `No config resolver ${rpc.rpcType?.name}, ${rpc.options.isConfigCanBeUndefined}`
        );
      }
    );
  }

  protected async _loadConfigFile(configFileName: string) {
    this.log.trace(() => `Load config "${configFileName}".`);
    const configModule = require(configFileName);
    const defaultExport = configModule?.default;

    const nodeModule = require.cache[require.resolve(configFileName)]!;

    const registerConfigResolver = configResolver => {
      this.loadedConfigs.push({
        nodeModule,
        resolver: configResolver,
      });
      this.configureRpcResolver(configResolver);
    };

    const configResolvers = Array.isArray(defaultExport)
      ? defaultExport
      : [defaultExport];

    for (const configResolver of configResolvers) {
      if (isRpcConfigResolver(configResolver)) {
        registerConfigResolver(configResolver);
      }
    }
  }

  protected async _loadDir(dir: string, isRoot = false) {
    if (!isRoot) {
      if (!touchSet(this._loadedDirs, dir)) return;
      if (await this.loaderModule.findIndexFileName(dir)) {
        this.log.trace(() => `Skip directory ${dir}.`);
        return;
      }
    }

    this.log.trace(
      () => `Scanning directroy "${relativePosixPath(DABSI_ROOT_DIR, dir)}".`
    );

    for (const baseName of await this.loaderModule.readDir(dir)) {
      // if (baseName.startsWith(".")) continue;
      const fileName = path.join(dir, baseName);
      const stat = await fs.promises.stat(fileName);
      if (stat.isDirectory()) {
        await this._loadDir(fileName);
        continue;
      } else if (/config\.ts$/i.test(fileName)) {
        await this._loadConfigFile(fileName);
      }
    }
  }

  async check(rpc: AnyRpc, context: ResolverMap) {
    this._isChecking = true;
    this.log.trace(() => "checking");

    context = Resolver.Context.create(context, {
      ...RpcRequest.provide(),
    });

    try {
      const configResolver = this.getConfigResolver(rpc);
      Resolver.check(configResolver, context);
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

  requestContext: ResolverMap = Resolver.Context.create(
    this.runner.context,
    Ticker.provide()
  );

  async processRequest(rpc: AnyRpc, rpcReq: RpcRequest, context: ResolverMap) {
    const { path, payload } = rpcReq;

    context = Resolver.Context.create(context, [rpcReq]);

    const configResolver = this.getConfigResolver(rpc);
    const config = Resolver.resolve(configResolver, context);
    const command = await rpc.createRpcCommand(config);
    return await command(path, payload);
  }
}
