import { MetaType, WithMetaType } from "@dabsi/common/MetaType";
import { Awaitable, Awaited } from "@dabsi/common/typings2/Async";
import { If, IsUndefined, Not } from "@dabsi/common/typings2/boolean";
import { Is } from "@dabsi/common/typings2/boolean/Is";
import { IsEmptyObject } from "@dabsi/common/typings2/boolean/IsEmptyObject";
import { Defined } from "@dabsi/common/typings2/Defined";
import { Fn } from "@dabsi/common/typings2/Fn";
import { Override } from "@dabsi/common/typings2/Override";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { BaseRpc } from "@dabsi/typerpc/BaseRpc";
import { ConfigFactory } from "@dabsi/typerpc/ConfigFactory";
import { IsGenericConfig } from "@dabsi/typerpc/GenericConfig";

export type TRpc = {
  Payload?: any;
  Handler: object;
  Connection: any;
  Children: Record<string, AnyRpc>;
  Config: object | undefined;
  Props: object;
};

export type AnyRpcWithChildren<T extends TRpc["Children"]> = Rpc<
  Override<
    TRpc,
    {
      Children: T;
    }
  >
>;

export type AnyRpcWithMap = AnyRpcWithChildren<{ map: AnyRpc }>;
export type AnyRpcWithTarget = AnyRpcWithChildren<{ target: AnyRpc }>;

export type RpcChildKey<T extends AnyRpc> = string & keyof RpcChildren<T>;

export type RpcLocator<T extends AnyRpc> = WithMetaType<{ rpc: T }> &
  {
    [K in RpcChildKey<T>]: RpcLocator<T["children"][K]>;
  };

export interface IRpc<T extends TRpc> {
  options: RpcOptions<TRpc>;

  children: T["Children"];

  rpcType: (...args) => AnyRpc;

  at<T extends AnyRpc, U extends AnyRpc>(
    this: T,
    callback: (locator: RpcLocator<T>) => WithMetaType<{ rpc: U }>
  ): U;
  at<
    T extends AnyRpcWithMap,
    K extends string & keyof T["children"]["map"]["children"]
  >(
    this: T,
    key: `:${K}`
  ): T["children"]["map"]["children"][K];

  at<
    T extends AnyRpcWithTarget,
    K extends string & keyof T["children"]["target"]["children"]
  >(
    this: T,
    key: `:${K}`
  ): T["children"]["target"]["children"][K];

  at<T extends AnyRpc, K extends keyof T["children"]>(
    this: T,
    key: K
  ): T["children"][K];

  createRpcConnection(path: any[], command: RpcCommand): T["Connection"];

  configureRpc(config: _RpcUnresolvedConfig<T>): T["Connection"];

  commandRpc(command: RpcCommand): T["Connection"];

  createRpcCommand(unresolvedConfig: _RpcUnresolvedConfig<T>): RpcCommand;

  resolveRpcConfig(
    unresolvedConfig: _RpcUnresolvedConfig<T>
  ): Promise<_RpcResolvedConfig<T>>;

  resolveRpcHandler(
    config: _RpcUnresolvedConfig<T>,
    parent: AnyRpcHandler | null
  ): Promise<_RpcResolvedHandler<T>>;

  createRpcHandler(
    config: _RpcResolvedConfig<T>,
    parent: AnyRpcHandler | null
  ): Promise<_RpcResolvedHandler<T>>;
}

export type _RpcConnection<T extends TRpc> = T["Connection"] & BasedRpc<T>;

export type _RpcResolvedHandler<T extends TRpc> = T["Handler"] & {
  config: _RpcResolvedConfig<T>;
  rpc: Rpc<T>;
  handle(payload: T["Payload"]): Awaitable;
  parent: _RpcResolvedHandler<TRpc> | null;

  route(path: any): Awaitable<_RpcResolvedHandler<TRpc>>;
  routeAndHandle(path: any[], body: any): Promise<any>;

  getChildHandler<K extends keyof T["Children"]>(
    key: K
  ): Promise<RpcResolvedHandler<T["Children"][K]>>;
};

export type _IRpcHandler<T extends TRpc> = {
  [K in string & keyof T["Children"] as `$${K}Config`]: _RpcUnresolvedConfig<
    //
    RpcType<T["Children"][K]>
  > | null;
};

export type _RpcHandlerClass<T extends TRpc, P = {}> = new (
  rpc: Rpc<T>,
  config: _RpcResolvedConfig<T>,
  parent: AnyRpcHandler | null
) => _RpcResolvedHandler<T> & P;

export type _RpcConnectionFactory<T extends TRpc> = (
  this: Rpc<T>,
  path: any[],
  command: RpcCommand
) => T["Connection"];

export type _RpcUnresolvedConfig<T extends TRpc> =
  | Extract<T["Config"], undefined>
  | (Defined<T["Config"]> & BasedRpc<T>)
  | If<Not<Is<T["Config"], Fn>>, ConfigFactory<T["Config"]>>
  | {
      $context: ConfigFactory<T["Config"], [Rpc<T>]>;
    };

export type _RpcResolvedConfig<
  T extends TRpc,
  Config = NonNullable<T["Config"]>
> = Config extends Fn
  ? IsGenericConfig<Config> extends true
    ? Awaited<ReturnType<Config>>
    : Config
  : Config;

export type RpcUnresolvedConfig<T extends BasedRpc> = _RpcUnresolvedConfig<
  RpcType<T>
>;

export type RpcConfig<T extends BasedRpc> = RpcType<T>["Config"];
export type RpcChildren<T extends BasedRpc> = RpcType<T>["Children"];

export type RpcChild<
  T extends BasedRpc,
  K extends keyof RpcChildren<T>
> = RpcChildren<T>[K];

export type RpcChildConfig<
  T extends BasedRpc,
  K extends keyof RpcChildren<T>
> = RpcUnresolvedConfig<RpcChild<T, K>>;

export type RpcUndefinedConfig<T extends BasedRpc> = If<
  IsUndefined<RpcUnresolvedConfig<T>>,
  undefined
>;

export type RpcConnection<T extends BasedRpc> = _RpcConnection<RpcType<T>>;

export type RpcPayload<T extends BasedRpc> = RpcType<T>["Payload"];

export function RpcConfig<T extends AnyRpc>(
  rpc: T,
  config: RpcUnresolvedConfig<T>
): RpcUnresolvedConfig<T> {
  return config;
}

export type RpcWithoutChildren = Rpc<
  Override<
    RpcType<AnyRpc>,
    {
      Children: {};
    }
  >
>;
export type RpcCommand = (path: any[], payload) => Promise<any>;

export type RpcResolvedConfig<T extends BasedRpc> = _RpcResolvedConfig<
  RpcType<T>
>;

export type Rpc<T extends TRpc> = WithMetaType<{
  TRpc: T;
}> &
  T["Props"] &
  IRpc<T>;

export type RpcResolvedHandler<T extends BasedRpc> = _RpcResolvedHandler<
  RpcType<T>
>;
export type IRpcHandler<T extends BasedRpc> = _IRpcHandler<RpcType<T>>;

export type RpcHandlerClass<T extends AnyRpc, P = {}> = _RpcHandlerClass<
  RpcType<T>,
  IRpcHandler<T>
>;

export type RpcIsGenericConfigOption<T extends Pick<TRpc, "Config">> =
  | IsGenericConfig<T["Config"]>
  | If<Not<Is<T["Config"], Fn>>, undefined>;

export type RpcIsConfigCanBeUndefinedOption<T extends Pick<TRpc, "Config">> =
  | boolean
  // If config is not undefined is false by default
  // if no children and is
  | If<Not<IsUndefined<T["Config"]>>, undefined>;

export type RpcPropsOption<T extends Pick<TRpc, "Props">> =
  | T["Props"]
  | If<IsEmptyObject<T["Props"]>, undefined>;

export type RpcChildrenOption<T extends Pick<TRpc, "Children">> =
  | T["Children"]
  | If<IsEmptyObject<T["Children"]>, undefined>;

export enum RpcConfigType {
  Any,
  Generic,
  Factory,
}

export type RpcOptions<T extends TRpc> = PartialUndefinedKeys<
  {
    isGenericConfig: RpcIsGenericConfigOption<T>;

    isConfigFn: boolean | If<Not<Is<T["Config"], Fn>>, undefined>;

    isConfigCanBeUndefined: RpcIsConfigCanBeUndefinedOption<T>;

    props: RpcPropsOption<T>;

    type?: Function;

    children: RpcChildrenOption<T>;
  },
  {
    // configType;

    connect: _RpcConnectionFactory<T>;

    handler: RpcHandlerClass<Rpc<T>>;
  }
>;

export type BasedRpc<T extends TRpc = TRpc> = WithMetaType<{ TRpc: T }>;

export type RpcType<T extends BasedRpc> = MetaType<T>["TRpc"];

export type RpcMapType<T extends Record<string, BasedRpc>> = {
  [K in keyof T]: RpcType<T[K]>;
};

export type AnyRpc = Rpc<TRpc>;

export type AnyRpcHandler = RpcResolvedHandler<AnyRpc>;

export function Rpc<R extends BasedRpc, T extends TRpc = RpcType<R>>(
  options: RpcOptions<T>
): Rpc<T> {
  const rpc = new BaseRpc(options as RpcOptions<TRpc>);
  (rpc as any).rpcType = options?.type;
  Object.defineProperties(
    rpc,
    Object.getOwnPropertyDescriptors(options["props"] || {})
  );
  return <any>rpc;
}

export function isRpc(obj): obj is AnyRpc {
  return obj?.constructor == BaseRpc;
}
