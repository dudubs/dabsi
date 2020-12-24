import { touchMap } from "@dabsi/common/map/touchMap";
import { touchSet } from "@dabsi/common/map/touchSet";
import { Lazy } from "@dabsi/common/patterns/lazy";
import { Once } from "@dabsi/common/patterns/Once";
import { inspect } from "@dabsi/logging/inspect";
import ExpressModule from "@dabsi/modules/ExpressModule";
import createConfigResolverFactory from "@dabsi/system/core/configResolverFactory";
import { SystemModule } from "@dabsi/system/core/SystemModule";
import { SystemRpc } from "@dabsi/system/core/SystemRpc";
import SystemRpcRequest from "@dabsi/system/core/SystemRpcRequest";
import { Inject, Module, Resolver } from "@dabsi/typedi";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { AnyRpc } from "@dabsi/typerpc/Rpc";
import {
  isRpcConfigResolver,
  RpcConfigResolver,
} from "@dabsi/typerpc/RpcConfigResolver";
import ProjectManager from "@dabsi/typestack/ProjectManager";
import BodyParser from "body-parser";
import colors from "colors/safe";
import fs from "fs";
import { Seq } from "immutable";
import { multer } from "multer";
import path from "path";
import { SystemRpcPath } from "./SystemRpc";

@Module()
export default class SystemRpcModule {
  protected _rpcConfigResolverMap = new Map<
    AnyRpc,
    RpcConfigResolver<AnyRpc>
  >();

  protected _isChecking = false;

  protected _rpcCreatedConfigResolverMap = new Map();

  log = this.systemModule.log.get("RPC");

  protected _loadedDirs: Set<string>;
  protected _loadedConfigsInfo: {
    nodeModule: NodeModule;
    resolver: RpcConfigResolver<AnyRpc>;
  }[];

  constructor(
    @Inject() protected systemModule: SystemModule,
    @Inject() protected expressModule: ExpressModule
  ) {
    expressModule.install({
      run: () => this.check(),
      routes: app => {
        app.post(
          SystemRpcPath,
          BodyParser.json(),
          BodyParser.urlencoded({ extended: true }),
          multer().array(),
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
        this._loadedDirs = new Set();
        this._loadedConfigsInfo = [];
        await this._loadDir(projectModule.dir);
      },
      loadIndexFiles: async callback => {
        for (const info of this._loadedConfigsInfo) {
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
            await callback(rpcModule?.filename);
          }
        }
      },
      check: async () => {
        await this.check();
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
    const configModule = require(configFileName);
    const configResolver = configModule?.default;
    if (isRpcConfigResolver(configResolver)) {
      this.log.trace(() => `Load config ${inspect(configResolver)}`);
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
    let configFiles: string[] = [];
    let fileNames = new Set();

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

  async check() {
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

  @Lazy() get indexFileNames() {
    const fileNames = new Set<string>();
    for (const info of this._loadedConfigsInfo) {
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
      } else {
        fileNames.add(rpcModule?.filename);
      }
    }
    return [...fileNames];
  }
}
