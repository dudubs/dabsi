import { defined } from "@dabsi/common/object/defined";
import { mapObject } from "@dabsi/common/object/mapObject";
import Lazy from "@dabsi/common/patterns/Lazy";
import { capitalize } from "@dabsi/common/string/capitalize";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { If, IsUndefined } from "@dabsi/common/typings2/boolean";
import { Is } from "@dabsi/common/typings2/boolean/Is";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { Fn } from "@dabsi/common/typings2/Fn";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { UndefinedIfIsUndefined } from "@dabsi/common/typings2/UndefinedIfIsUndefined";
import {
  AnyGenericConfig,
  ConfiguratorType,
  GenericConfig2,
  IsGenericConfig,
} from "@dabsi/typerpc2/GenericConfig";
import { getChildRpcType } from "@dabsi/typerpc2/getRpcMetadata";
import {
  Rpc,
  RpcContextualMember,
  RpcParametrialMember,
  RpcType,
} from "@dabsi/typerpc2/Rpc";
import { RpcHandler, RpcMemberHandler } from "@dabsi/typerpc2/RpcHandler";
import { RpcMembers, RpcMemberType } from "@dabsi/typerpc2/RpcMembers";
import { assignDescriptors } from "../common/object/assignDescriptors";
import {
  AnyRpcWithConfig,
  InferredRpcConfig,
  RpcConfigurator,
  RpcWithConfigSymbol,
} from "./RpcConfig";

export type InferredRpcHandlerConfig<
  T extends AnyRpcWithConfig
> = ConfiguratorType<InferredRpcConfig<T>>;

type ExtractPrefix<P extends string, K> = K extends `${P}${infer K}`
  ? K
  : never;

export class BaseRpcConfigHandler<T extends Rpc, C> {
  readonly rpcType!: RpcType<T>;

  constructor(
    readonly config: NonNullable<C>,
    readonly configurator: RpcConfigurator<T>
  ) {}

  protected _getContextualHandlerCache = new Map();

  // uses for get lazy properties.
  get<T, K extends ExtractKeys<T, () => any>>(
    this: T,
    key: ExtractPrefix<"__", K>
  ): ReturnType<T[K]> {
    return (this[key + "Lazy"] ??= this["__" + key]());
  }

  protected _getHandler<T extends AnyRpcWithConfig, K extends keyof T>(
    this: BaseRpcConfigHandler<T, any>,
    memberKey: string & K
  ): RpcMemberHandler<T[K]> {
    return defined(
      this["handle" + capitalize(memberKey)],
      () =>
        `No handle function for "${this.rpcType.name}.${memberKey}" in ${this.constructor.name}`
    ).bind(this);
  }

  getContextualHandler<
    T extends AnyRpcWithConfig,
    K extends ExtractKeys<T, RpcContextualMember>
  >(
    this: BaseRpcConfigHandler<T, any>,
    memberKey: string & K
  ): Promise<RpcHandler<T[K]>> {
    return this._getContextualHandlerCache.touch(memberKey, async () =>
      this._getHandler(memberKey)(getChildRpcType(this.rpcType, memberKey))
    );
  }

  async getParametrialHandler<
    T extends AnyRpcWithConfig,
    K extends ExtractKeys<T, RpcParametrialMember>
  >(
    this: BaseRpcConfigHandler<T, any>,
    memberKey: string & K,
    params: Parameters<T[K]>
  ): Promise<RpcHandler<ReturnType<T[K]>>> {
    return <any>(
      this._getHandler(memberKey)(
        getChildRpcType(this.rpcType, memberKey),
        ...params
      )
    );
  }
}

export interface RpcConfigHandlerType<T extends AnyRpcWithConfig, H> {
  readonly rpcType: RpcType<T>;

  readonly rpcConfigType: "GENERIC" | "REGULAR" | "FUNCTION";

  readonly resolveRpcGenericConfig: RpcGenericConfigResolver<T>;

  readonly resolveRpcHandlerConfig: any;

  readonly isRpcConfigCanBeUndefined: boolean;

  createRpcMemberHandler?(
    memberKey: string,
    memberType: RpcMemberType,
    propertyType: Function
  ): Function;

  new (config: any, configurator: RpcConfigurator<T>): H;
}

export type RpcConfigType<
  T extends AnyRpcWithConfig,
  U = InferredRpcConfig<T>
> = U extends Fn ? If<IsGenericConfig<U>, "GENERIC", "FUNCTION"> : "REGULAR";

export type RpcGenericConfigResolver<
  R extends AnyRpcWithConfig
> = InferredRpcConfig<R> extends AnyGenericConfig
  ?
      | GenericConfig2.ResolveFn<InferredRpcConfig<R>>
      | If<GenericConfig2.IsWithoutResolveFn<InferredRpcConfig<R>>, undefined>
  : undefined;

export type RpcHandlerConfigResolver<R extends AnyRpcWithConfig, C> =
  | ((config: InferredRpcHandlerConfig<R>) => Awaitable<C>)
  | If<Is<C, InferredRpcHandlerConfig<R>>, undefined>;

export type RpcConfigHandlerOptions<
  R extends AnyRpcWithConfig,
  E,
  OH = {}, // extra optional handler
  RH = {}, // extra required handler,
  C = InferredRpcHandlerConfig<R>
> = PartialUndefinedKeys<
  OH & {
    configType:
      | RpcConfigType<R>
      | If<Is<RpcConfigType<R>, "REGULAR">, undefined>;

    resolveGenericConfig: RpcGenericConfigResolver<R>;

    resolveHandlerConfig: RpcHandlerConfigResolver<R, C>;

    configCanBeUndefined: IsUndefined<InferredRpcHandlerConfig<R>> extends true
      ? boolean
      : false | undefined;
  },
  RH & {
    // TODO: rename to methods
    helpers?: E & ThisType<BaseRpcConfigHandler<R, C> & E>;

    createMemberHandler?(
      this: RpcType<R>,
      memberKey: string,
      memberType: RpcMemberType,
      propertyType: Function
    ): undefined | ((this: BaseRpcConfigHandler<R, C>, ...args: any[]) => any);
  }
>;
export const RpcConfigHandlerTypeSymbol = Symbol("RpcConfigHandlerTypeSymbol");

export type RpcHandlerProps<T extends Rpc> = Omit<RpcHandler<T>, "config">;

export function RpcConfigHandler<
  R extends AnyRpcWithConfig,
  H extends RpcHandlerProps<R>,
  E = {}
>(
  rpcType: RpcType<R>,
  options: RpcConfigHandlerOptions<R, E>,
  handler: H &
    ThisType<BaseRpcConfigHandler<R, InferredRpcHandlerConfig<R>> & E>
): RpcConfigHandlerType<R, H & E>;

export function RpcConfigHandler(
  rpcType,
  {
    configType = "REGULAR",
    resolveGenericConfig,
    resolveHandlerConfig,
    createMemberHandler,
    configCanBeUndefined,
    helpers,
  }: RpcConfigHandlerOptions<any, any>,
  handler
) {
  Object.defineProperty(rpcType, RpcWithConfigSymbol, {
    value: true,
    enumerable: false,
  });

  class HandlerType extends BaseRpcConfigHandler<AnyRpcWithConfig, any> {
    static readonly rpcType = rpcType;

    static readonly rpcConfigType: any = configType;

    static readonly resolveRpcGenericConfig = resolveGenericConfig;

    static readonly resolveRpcHandlerConfig = resolveHandlerConfig;

    static readonly createRpcMemberHandler = createMemberHandler;

    static readonly isRpcConfigCanBeUndefined = configCanBeUndefined;
  }

  assignDescriptors(HandlerType.prototype, handler);

  assignDescriptors(HandlerType.prototype, helpers);

  Object.defineProperty(HandlerType, "name", {
    value: `RpcConfigHandler<${rpcType.name}>`,
  });

  Object.defineProperty(rpcType, RpcConfigHandlerTypeSymbol, {
    enumerable: false,
    value: HandlerType,
  });

  return <any>HandlerType;
}
