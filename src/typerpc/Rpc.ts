import { touchMap } from "../common/map/touchMap";
import { MetaType, WithMetaType } from "../common/MetaType";
import { mergeDescriptors } from "../common/object/mergeDescriptors";
import { Awaitable, Awaited } from "../common/typings2/Async";
import { If, IsUndefined, Not } from "../common/typings2/boolean";
import { Is } from "../common/typings2/boolean/Is";
import { IsEmptyObject } from "../common/typings2/boolean/IsEmptyObject";
import { Fn } from "../common/typings2/Fn";
import { Override } from "../common/typings2/Override";
import { PartialUndefinedKeys } from "../common/typings2/PartialUndefinedKeys";
import { inspect } from "../logging/inspect";
import { ConfigFactory } from "./ConfigFactory";
import { GenericConfig, IsGenericConfig } from "./GenericConfig";

export type RpcCommand = (path: any[], payload: any) => Promise<any>;

export type TRpc = {
  Handler: object;
  Connection: any;
  Children: Record<string, AnyRpc>;
  Config: object | undefined;
  Props: object;
};

export type AnyRpc = Rpc<TRpc>;

export type Rpc<T extends TRpc> = WithMetaType<{
  TRpc: T;
}> &
  T["Props"] & {
    readonly options: RpcOptions<TRpc>;

    readonly service: _RpcConnection<T>;

    children: T["Children"];

    createRpcConnection(command: RpcCommand): T["Connection"];

    // TODO: rename:
    //  - *Rpc* to **
    createRpcCommand(unresolvedConfig: _RpcUnresolvedConfig<T>): RpcCommand;

    resolveRpcConfig(
      unresolvedConfig: _RpcUnresolvedConfig<T>
    ): Promise<_RpcResolvedConfig<T>>;

    resolveRpcHandler(
      config: _RpcUnresolvedConfig<T>,
      parent: RpcResolvedHandler<AnyRpc> | null
    ): Promise<_RpcResolvedHandler<T>>;

    createRpcHandler(
      config: _RpcResolvedConfig<T>,
      parent: RpcResolvedHandler<AnyRpc> | null
    ): Promise<_RpcResolvedHandler<T>>;
  };

const rpcToServiceCommand = new WeakMap<any, Fn>();

export function Rpc<R extends BasedRpc, T extends TRpc = RpcType<R>>(
  options: RpcOptions<T>
): Rpc<T> {
  let service;
  const rpc: Rpc<T> = Object.setPrototypeOf(
    mergeDescriptors(options["props"] || {}, {
      options,
      get service() {
        return service;
      },
    }),
    AnyRpc
  );
  service = rpc.createRpcConnection(payload => {
    const command = rpcToServiceCommand.get(service);
    if (!command) {
      throw new RpcError(`No handle for service.`);
    }
    return command(payload);
  });
  return rpc;
}

export type _RpcResolvedConfig<
  T extends TRpc,
  Config = NonNullable<T["Config"]>
> = Config extends Fn
  ? IsGenericConfig<Config> extends true
    ? Awaited<ReturnType<Config>>
    : Config
  : Config;

export type RpcResolvedHandler<T extends BasedRpc> = _RpcResolvedHandler<
  RpcType<T>
>;

export type _RpcResolvedHandler<T extends TRpc> = T["Handler"] & {
  config: _RpcResolvedConfig<T>;
  rpc: Rpc<T>;
  handle(payload: any): Awaitable<any>;
  parent: _RpcResolvedHandler<TRpc> | null;

  route?(data: any): Awaitable<RpcResolvedHandler<AnyRpc>>;
};

export type IRpcHandler<T extends BasedRpc> = _RpcResolvedHandler<RpcType<T>>;

export abstract class AbstractRpcHandler<
  R extends AnyRpc,
  T extends TRpc = RpcType<R>
> {
  constructor(
    public rpc: R,
    public config: _RpcResolvedConfig<T>,
    public parent: RpcResolvedHandler<AnyRpc>
  ) {}

  abstract handle(payload: any): Promise<any>;

  getChildConfig?(key: string): Awaitable<RpcUnresolvedConfig<AnyRpc>>;
}

export type RpcHandlerClass<T extends AnyRpc, P = {}> = new (
  rpc: T,
  config: _RpcResolvedConfig<RpcType<T>>,
  parent: RpcResolvedHandler<AnyRpc> | null
) => _RpcResolvedHandler<RpcType<T>> & P;

export type RpcIsGenericConfigOption<T extends Pick<TRpc, "Config">> =
  | IsGenericConfig<T["Config"]>
  | If<Not<Is<T["Config"], Fn>>, undefined>;

export type RpcPropsOption<T extends Pick<TRpc, "Props">> =
  | T["Props"]
  | If<IsEmptyObject<T["Props"]>, undefined>;

export type RpcOptions<
  T extends TRpc,
  ConfigIsFn extends boolean = Is<T["Config"], Fn>,
  ConfigIsGenericConfig extends boolean = IsGenericConfig<T["Config"]>
> = PartialUndefinedKeys<
  {
    // TODO: configType: 'function' | 'generic' | 'object'
    isGenericConfig: RpcIsGenericConfigOption<T>;

    isConfigFn: boolean | If<Not<Is<T["Config"], Fn>>, undefined>;

    props: RpcPropsOption<T>;
  },
  {
    connect(this: Rpc<T>, path: any[], command: RpcCommand): T["Connection"];

    handler: RpcHandlerClass<Rpc<T>>;
  }
>;

const rpcToUndefinedConfig = new WeakMap<AnyRpc, any>();
const rpcToConfigToContext = new WeakMap<
  AnyRpc,
  WeakMap<any, Promise<_RpcResolvedHandler<TRpc>>>
>();

let isServiceHandler = false;

export const AnyRpc: AnyRpc = {
  get options(): any {
    throw new Error();
  },
  get service(): any {
    throw new Error();
  },
  get children(): any {
    throw new Error();
  },
  createRpcConnection(handler) {
    if (isServiceHandler) {
      rpcToServiceCommand.set(this.service, handler);
    }
    return this.options.connect.call(this, handler);
  },

  async createRpcHandler(config, parent: RpcResolvedHandler<AnyRpc> | null) {
    return new this.options.handler(this, config, parent);
  },

  async resolveRpcHandler(
    unresolvedConfig,
    parent: RpcResolvedHandler<AnyRpc> | null
  ) {
    return this.createRpcHandler(
      await this.resolveRpcConfig(unresolvedConfig),
      parent
    );
  },

  async resolveRpcConfig(config): Promise<object> {
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
  },
  createRpcCommand(unresolvedConfig) {
    if (!unresolvedConfig) {
      unresolvedConfig = touchMap(rpcToUndefinedConfig, this, Object);
    }
    let config;
    let hasConfig = false;
    return async payload => {
      if (!hasConfig) {
        config = await this.resolveRpcConfig(unresolvedConfig);
        hasConfig = true;
      }
      const context = await touchMap(
        touchMap(rpcToConfigToContext, this, () => new WeakMap()),
        config,
        () => this.createRpcHandler(config, null)
      );
      return context.handle(payload);
    };
  },
};

export type BasedRpc<T extends TRpc = TRpc> = WithMetaType<{ TRpc: T }>;

export type RpcType<T extends BasedRpc> = MetaType<T>["TRpc"];
export type RpcMapType<T extends Record<string, BasedRpc>> = {
  [K in keyof T]: RpcType<T[K]>;
};

export type RpcHook<R extends BasedRpc, T extends Partial<TRpc>> = Rpc<
  Extract<Override<RpcType<R>, T>, TRpc>
>;

export type _RpcUnresolvedConfig<T extends TRpc> =
  | T["Config"]
  | If<Not<Is<T["Config"], Fn>>, ConfigFactory<T["Config"]>>
  // TODO: $configContext, $genericConfigContext
  | {
      $context: ConfigFactory<T["Config"], [Rpc<T>]>;
    };

export type RpcUnresolvedConfig<T extends BasedRpc> = _RpcUnresolvedConfig<
  RpcType<T>
>;

export type RpcConfig<T extends BasedRpc> = RpcType<T>["Config"];

export type RpcUndefinedConfig<T extends BasedRpc> = If<
  IsUndefined<RpcUnresolvedConfig<T>>,
  undefined
>;

export class RpcError extends Error {}

export type RpcConnection<T extends BasedRpc> = _RpcConnection<RpcType<T>>;

export type _RpcConnection<T extends TRpc> = T["Connection"] & BasedRpc<T>;

export function commandRpcService<T extends AnyRpc>(
  rpc: T,
  command: RpcCommand
): RpcConnection<T> {
  isServiceHandler = true;
  const connection = rpc.createRpcConnection(command);
  isServiceHandler = false;
  return connection;
}

export function configureRpcService<T extends AnyRpc>(
  rpc: T,
  config: RpcUnresolvedConfig<T>
): RpcConnection<T> {
  return commandRpcService(rpc, rpc.createRpcCommand(config));
}

export function RpcConfig<T extends AnyRpc>(
  rpc: T,
  config: RpcUnresolvedConfig<T>
): RpcUnresolvedConfig<T> {
  return config;
}
