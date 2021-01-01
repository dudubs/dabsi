import { touchMap } from "@dabsi/common/map/touchMap";
import { touchSet } from "@dabsi/common/map/touchSet";
import { Lazy } from "@dabsi/common/patterns/lazy";
import { inspect } from "@dabsi/logging/inspect";
import ExpressModule from "@dabsi/modules/ExpressModule";
import createConfigResolverFactory from "@dabsi/system/rpc/configResolverFactory";
import { SystemModule } from "@dabsi/system/core";
import { SystemRpc, SystemRpcPath } from "@dabsi/system/rpc/SystemRpc";
import SystemRpcRequest from "@dabsi/system/rpc/SystemRpcRequest";
import { AnyResolverMap, Inject, Module, Resolver } from "@dabsi/typedi";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { AnyRpc } from "@dabsi/typerpc/Rpc";
import {
  isRpcConfigResolver,
  RpcConfigResolver,
} from "@dabsi/typerpc/RpcConfigResolver";
import BodyParser from "body-parser";
import colors from "colors/safe";
import fs from "fs";
import { Seq } from "immutable";
import multer from "multer";
import path from "path";
import { WeakId } from "@dabsi/common/WeakId";

@Module()
export default class SystemRpcModule {
  protected _rpcConfigResolverMap = new Map<
    AnyRpc,
    RpcConfigResolver<AnyRpc>
  >();

  protected _isChecking = false;

  protected _rpcCreatedConfigResolverMap = new Map();

  log = this.systemModule.log.get("RPC");

  protected _loadedDirs = new Set<string>();
  protected _loadedConfigsInfo: {
    nodeModule: NodeModule;
    resolver: RpcConfigResolver<AnyRpc>;
  }[] = [];

  constructor(
    @Inject() protected systemModule: SystemModule,
    @Inject() protected expressModule: ExpressModule
  ) {
    expressModule.install({
      run: () => this.systemModule.check(),
      routes: app => {
        app.post(
          SystemRpcPath,
          BodyParser.json(),
          BodyParser.urlencoded({ extended: true }),
          multer().any(),
          systemModule.createHandler(),
          async (req, res) => {
            const { path, payload } =
              typeof req.body.command === "string"
                ? JSON.parse(req.body.command)
                : req.body;

            const sysReq = new SystemRpcRequest(path, payload, req.body);

            this.log.info(
              () =>
                `${(path as any[])
                  .toSeq()
                  .map(path =>
                    typeof path === "object" ? JSON.stringify(path) : path
                  )
                  .join("/")}`
            );

            this.log.trace(() => colors.gray(JSON.stringify(payload)));

            Resolver.provide(
              req.systemContext,
              SystemRpcRequest.provide(() => sysReq)
            );

            const configResolver = this.getRpcConfigResolver(SystemRpc);
            const config = Resolver.resolve(configResolver, req.systemContext);
            const command = await SystemRpc.createRpcCommand(config);
            res.json({
              result: await command(path, payload),
            });
          }
        );
      },
    });

    systemModule.install({
      loadProjectModule: async projectModule => {
        await this._loadDir(projectModule.dir);
      },
      loadIndexFiles: async callback => {
        for (const info of this._loadedConfigsInfo) {
          this.log.trace(
            () => `Find index file for ${inspect(info.resolver)}.`
          );
          const rpcModule = info.nodeModule.children.find(child => {
            return Seq.Keyed(child.exports).find(x => {
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
            await callback(rpcModule?.filename);
          }
        }
      },
      check: async () => {
        await this._check();
      },
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

  protected async _loadDir(dir: string) {
    if (!touchSet(this._loadedDirs, dir)) return;

    this.log.trace(() => `Scan dir ${dir}.`);
    for (const baseName of await fs.promises.readdir(dir)) {
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

  protected async _check() {
    this._isChecking = true;
    this.log.trace(() => "checking");

    const context = Resolver.createContext(
      {
        ...SystemRpcRequest.provide(),
      },
      this.systemModule.requestContext
    );
    try {
      const configResolver = this.getRpcConfigResolver(SystemRpc);
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

  async processRequest(sysReq: SystemRpcRequest, context: AnyResolverMap) {
    const { path, payload } = sysReq;
    this.log.info(
      () =>
        `${(path as any[])
          .toSeq()
          .map(path => (typeof path === "object" ? JSON.stringify(path) : path))
          .join("/")}`
    );

    this.log.trace(() => colors.gray(JSON.stringify(payload)));

    Resolver.provide(
      context,
      SystemRpcRequest.provide(() => sysReq)
    );

    const configResolver = this.getRpcConfigResolver(SystemRpc);
    const config = Resolver.resolve(configResolver, context);
    const command = await SystemRpc.createRpcCommand(config);
    return await command(path, payload);
  }
}
