import { touchMap } from "@dabsi/common/map/touchMap";
import { touchSet } from "@dabsi/common/map/touchSet";
import Lazy from "@dabsi/common/patterns/lazy";
import { inspect } from "@dabsi/logging/inspect";
import createConfigResolverFactory from "@dabsi/modules/rpc/configResolverFactory";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import { AnyResolverMap, Inject, Module, Resolver } from "@dabsi/typedi";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { AnyRpc } from "@dabsi/typerpc/Rpc";
import ProjectModule from "@dabsi/typestack/ProjectModule";
import colors from "colors/safe";
import fs from "fs";
import { Seq } from "immutable4";
import path from "path";
import { DABSI_ROOT_DIR } from "../..";
import LoaderModule from "../LoaderModule";
import { relativePosixPath } from "../pathHelpers";
import { isRpcConfigResolver, RpcConfigResolver } from "./RpcConfigResolver";

@Module()
export default class RpcModule {
  protected _rpcConfigResolverMap = new Map<
    AnyRpc,
    RpcConfigResolver<AnyRpc>
  >();

  protected _isChecking = false;

  protected _rpcCreatedConfigResolverMap = new Map();

  log = log.get("RPC");

  protected _loadedDirs = new Set<string>();
  protected _loadedConfigsInfo: {
    nodeModule: NodeModule;
    resolver: RpcConfigResolver<AnyRpc>;
  }[] = [];

  constructor(
    @Inject() protected projectModule: ProjectModule,
    @Inject() protected loaderModule: LoaderModule
  ) {
    projectModule
      .onProjectModuleLoaded(async projectModuleInfo => {
        // const serverDir = path.join(projectModuleInfo.dir, "server");
        // if (await this.loaderModule.isDir(serverDir)) {
        //   await this._loadDir(serverDir, true);
        // }
        await this._loadDir(projectModuleInfo.dir, true);
      })
      .onBuildCommonFiles(async addCommonFile => {
        for (const info of this._loadedConfigsInfo) {
          this.log.trace(
            () => `Find index file for ${inspect(info.resolver)}.`
          );
          const rpcModule = info.nodeModule.children.find(child => {
            if (/[\\\/]node_modules[\\\/]/.test(child.filename)) return false;

            return Seq.Keyed(
              typeof child.exports === "object" ? child.exports : {}
            ).find(x => {
              return (
                x === info.resolver.rpc || (x as any)?.[0] === info.resolver.rpc
              );
            });
          });
          if (!rpcModule?.filename) {
            this.log.trace(
              () =>
                `No found rpc file for ${info.resolver} at "${info.nodeModule.filename}".`
            );
          } else if (rpcModule?.filename) {
            this.log.trace(() => `Include index file "${rpcModule.filename}".`);
            await addCommonFile(rpcModule?.filename);
          }
        }
      });
  }

  configureRpcResolver(configResolver: RpcConfigResolver<AnyRpc>) {
    this._rpcConfigResolverMap.set(configResolver.rpc, configResolver);
  }

  @Lazy() get createRpcConfigResolver() {
    return createConfigResolverFactory(rpc => this.getRpcConfigResolver(rpc));
  }
  getRpcConfigResolver<T extends AnyRpc>(rpc: T): RpcConfigResolver<T> {
    return <any>touchMap(
      this._rpcConfigResolverMap,
      rpc,
      (): RpcConfigResolver<T> => {
        const configResolver = this.createRpcConfigResolver(rpc);
        if (configResolver) return configResolver as RpcConfigResolver<T>;

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
      this._loadedConfigsInfo.push({
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
      const fileName = path.join(dir, baseName);
      const state = await fs.promises.stat(fileName);
      if (state.isDirectory()) {
        await this._loadDir(fileName);
        continue;
      } else if (/Config\.ts$/.test(fileName)) {
        await this._loadConfig(fileName);
      }
    }
  }

  async check(rpc: AnyRpc, context: AnyResolverMap) {
    this._isChecking = true;
    this.log.trace(() => "checking");

    context = Resolver.createContext(
      {
        ...RpcRequest.provide(),
      },
      context
    );

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

  async processRequest(
    rpc: AnyRpc,
    rpcReq: RpcRequest,
    context: AnyResolverMap
  ) {
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
