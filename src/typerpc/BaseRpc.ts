import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { touchMap } from "@dabsi/common/map/touchMap";
import { createObjectProxy } from "@dabsi/common/object/createObjectProxy";
import { Fn } from "@dabsi/common/typings2/Fn";
import { inspect } from "@dabsi/logging/inspect";
import { ConfigFactory } from "@dabsi/typerpc/ConfigFactory";
import { GenericConfig } from "@dabsi/typerpc/GenericConfig";
import {
  AnyRpc,
  AnyRpcHandler,
  IRpc,
  RpcCommand,
  RpcOptions,
  TRpc,
  _RpcResolvedConfig,
  _RpcResolvedHandler,
  _RpcUnresolvedConfig,
} from "@dabsi/typerpc/Rpc";
import { RpcError } from "@dabsi/typerpc/RpcError";

type T = TRpc;

const serviceCommandMap = new WeakMap<any, Fn>();

const undefinedConfigCacheMap = new WeakMap<AnyRpc, any>();
const configHandlerCacheMap = new WeakMap<
  AnyRpc,
  WeakMap<any, Promise<_RpcResolvedHandler<TRpc>>>
>();

let isServiceCommand = false;

const getRpcLocator = WeakMapFactory((rpc: AnyRpc) => {
  const proxy: any = createObjectProxy(rpc.children, child => {
    return getRpcLocator(child);
  });
  proxy.__rpc = rpc;
  return proxy;
});

export class BaseRpc implements IRpc<T> {
  rpcType;

  children = this.options.children || {};

  constructor(public options: RpcOptions<T>) {}

  at(arg) {
    if (typeof arg === "function") {
      return arg(getRpcLocator(this)).__rpc;
    }

    if (typeof arg === "string") {
      const key = arg;
      if (key.startsWith(":")) {
        return (this.children.map || this.children.target).children[
          key.slice(1)
        ];
      }
      return this.children[key];
    }
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

  async resolveRpcConfig(config: any): Promise<_RpcResolvedConfig<T>> {
    if (config && typeof config === "object" && "$context" in config) {
      config = await ConfigFactory(config.$context, [this]);
    }

    if (
      config &&
      Array.isArray(config) &&
      config.length === 1 &&
      typeof config[0] === "function"
    ) {
      config = await ConfigFactory(config[0], [this]);
    }

    if (this.options.isGenericConfig) {
      if (typeof config !== "function")
        throw new RpcError(
          `expected to generic config, got: ${inspect(config)}`,
          this
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

  [inspect.custom]() {
    return `${this.rpcType?.name || "UnknownRpc"}`;
  }
}
