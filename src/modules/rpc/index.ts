import { touchMap } from "@dabsi/common/map/touchMap";
import { touchSet } from "@dabsi/common/set/touchSet";
import Lazy from "@dabsi/common/patterns/lazy";
import { inspect } from "@dabsi/logging/inspect";
import { createRpcConfigResolverGenerator } from "@dabsi/modules/rpc/configResolverGenerator";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import { Module, Resolver, ResolverMap } from "@dabsi/typedi";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { AnyRpc } from "@dabsi/typerpc/Rpc";
import { RpcError } from "@dabsi/typerpc/RpcError";
import ProjectModule from "@dabsi/typestack/ProjectModule";
import colors from "colors/safe";
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
    protected loaderModule: LoaderModule
  ) {
    loaderModule.directoryLoaders.push(dir => this._loadDir(dir, true));
  }

  configureRpcResolver(configResolver: RpcConfigResolver<AnyRpc>) {
    if (this._rpcConfigResolverMap.has(configResolver.rpc)) {
      throw new RpcError(`Can't override config resolver.`);
    }
    this._rpcConfigResolverMap.set(configResolver.rpc, configResolver);
  }

  @Lazy() get generateRpcConfigResolver() {
    return createRpcConfigResolverGenerator(rpc =>
      this.getRpcConfigResolver(rpc)
    );
  }

  getRpcConfigResolver<T extends AnyRpc>(rpc: T): RpcConfigResolver<T> {
    return <any>touchMap(
      this._rpcConfigResolverMap,
      rpc,
      (): RpcConfigResolver<T> => {
        const configResolver = this.generateRpcConfigResolver(rpc);
        if (configResolver) {
          return configResolver as RpcConfigResolver<T>;
        }
        throw new ResolveError(
          `No config resolver ${rpc.rpcType?.name}, ${rpc.options.isConfigCanBeUndefined}`
        );
      }
    );
  }

  protected async _loadConfig(configFileName: string) {
    this.log.trace(() => `Load config "${configFileName}".`);
    const configModule = require(configFileName);
    const configResolver = configModule?.default;
    if (isRpcConfigResolver(configResolver)) {
      this.log.trace(() => `Found config resolver ${inspect(configResolver)}}`);
      this.loadedConfigs.push({
        nodeModule: require.cache[require.resolve(configFileName)]!,
        resolver: configResolver,
      });
      this.configureRpcResolver(configResolver);
    } else {
      this.log.trace(() => `No default config "${configFileName}".`);
    }
  }

  protected async _loadDir(dir: string, isRoot = false) {
    if (!isRoot) {
      if (!touchSet(this._loadedDirs, dir)) return;
      if (await this.loaderModule.getIndexFile(dir)) {
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
        await this._loadConfig(fileName);
      }
    }
  }

  async check(rpc: AnyRpc, context: ResolverMap) {
    this._isChecking = true;
    this.log.trace(() => "checking");

    context = Resolver.createContext(context, {
      ...RpcRequest.provide(),
    });

    try {
      const configResolver = this.getRpcConfigResolver(rpc);
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

  async processRequest(rpc: AnyRpc, rpcReq: RpcRequest, context: ResolverMap) {
    const { path, payload } = rpcReq;

    Resolver.provide(
      context,
      RpcRequest.provide(() => rpcReq)
    );

    this.log.info(
      () =>
        `${(path as any[])
          .toSeq()
          .map(path => (typeof path === "object" ? JSON.stringify(path) : path))
          .join("/")}`
    );

    this.log.trace(() => colors.gray(JSON.stringify(payload, null, 2)));

    const configResolver = this.getRpcConfigResolver(rpc);
    const config = Resolver.resolve(configResolver, context);
    const command = await rpc.createRpcCommand(config);
    return await command(path, payload);
  }
}
