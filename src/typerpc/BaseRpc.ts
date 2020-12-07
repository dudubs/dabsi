import { touchMap } from "../common/map/touchMap";
import { Lazy } from "../common/patterns/lazy";
import { Fn } from "../common/typings2/Fn";
import { inspect } from "../logging/inspect";
import { ConfigFactory } from "./ConfigFactory";
import { GenericConfig } from "./GenericConfig";
import {
  IRpc,
  _RpcResolvedConfig,
  _RpcResolvedHandler,
  _RpcUnresolvedConfig,
  AnyRpc,
  AnyRpcHandler,
  RpcWithoutChildren,
  RpcCommand,
  RpcError,
  RpcOptions,
  TRpc,
} from "./Rpc";

type T = TRpc;

const serviceCommandMap = new WeakMap<any, Fn>();

const undefinedConfigCacheMap = new WeakMap<AnyRpc, any>();
const configHandlerCacheMap = new WeakMap<
  AnyRpc,
  WeakMap<any, Promise<_RpcResolvedHandler<TRpc>>>
>();

let isServiceCommand = false;

export class BaseRpc implements IRpc<T> {
  rpcType;

  children = this.options.children || {};

  constructor(public options: RpcOptions<T>) {}

  at(key, callback?) {
    if (typeof key === "function") {
      const { rpc } = key(makeLoc(this));
      return rpc;
      function makeLoc(rpc) {
        loc.rpc = rpc;
        return loc;
        function loc(key, callback?) {
          const child = rpc.children[key];
          callback?.(child);
          return makeLoc(child);
        }
      }
    }

    callback?.(this.children[key]);
    return this.children[key];
  }

  commandRpc(command) {
    return this.createRpcConnection([], command);
  }
  configureRpc(config) {
    return this.createRpcConnection([], this.createRpcCommand(config));
  }

  createRpcConnection(path: any[], command: RpcCommand): T["Connection"] {
    if (isServiceCommand) {
      serviceCommandMap.set(this, command);
    }
    return this.options.connect.call(this, path, command);
  }

  async resolveRpcConfig(
    config: _RpcUnresolvedConfig<T>
  ): Promise<_RpcResolvedConfig<T>> {
    if (config && typeof config === "object" && "$context" in config) {
      config = await ConfigFactory(config.$context, this);
    }

    if (
      config &&
      Array.isArray(config) &&
      config.length === 1 &&
      typeof config[0] === "function"
    ) {
      config = await ConfigFactory(config[0], this);
    }

    if (this.options.isGenericConfig) {
      if (typeof config !== "function")
        throw new TypeError(
          `expected to generic config, got: ${inspect(config)}`
        );
      config = await GenericConfig(config as GenericConfig);
    } else if (typeof config === "function" && !this.options.isConfigFn) {
      config = await ConfigFactory(config as ConfigFactory<any>);
    }

    return config || {};
  }

  async resolveRpcHandler(
    unresolvedConfig: _RpcUnresolvedConfig<T>,
    parent: AnyRpcHandler | null
  ): Promise<_RpcResolvedHandler<T>> {
    return this.createRpcHandler(
      await this.resolveRpcConfig(unresolvedConfig),
      parent
    );
  }

  async createRpcHandler(
    config: _RpcResolvedConfig<T>,
    parent: AnyRpcHandler | null
  ): Promise<_RpcResolvedHandler<T>> {
    return new this.options.handler(this, config, parent);
  }

  createRpcCommand(unresolvedConfig: _RpcUnresolvedConfig<T>): RpcCommand {
    if (!unresolvedConfig) {
      unresolvedConfig = touchMap(undefinedConfigCacheMap, this, Object);
    }
    let config;
    let hasConfig = false;
    return async (path, payload) => {
      if (!hasConfig) {
        config = await this.resolveRpcConfig(unresolvedConfig);
        hasConfig = true;
      }
      const handler = await touchMap(
        touchMap(configHandlerCacheMap, this, () => new WeakMap()),
        config,
        () => this.createRpcHandler(config, null)
      );
      return handler.routeAndHandle(path, payload);
    };
  }
}
