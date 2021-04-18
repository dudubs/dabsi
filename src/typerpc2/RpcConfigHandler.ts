import { capitalize } from "@dabsi/common/string/capitalize";
import { If } from "@dabsi/common/typings2/boolean";
import { Is } from "@dabsi/common/typings2/boolean/Is";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { Fn } from "@dabsi/common/typings2/Fn";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import {
  AnyGenericConfig,
  GenericConfig2,
  GenericConfigOrFactoryType,
  IsGenericConfig,
} from "@dabsi/typerpc2/GenericConfig";
import {
  RpcContextualMember,
  RpcParametrialMember,
  RpcType,
} from "@dabsi/typerpc2/Rpc";
import { RpcHandler, RpcMemberHandler } from "@dabsi/typerpc2/RpcHandler";
import { RpcMemberType } from "@dabsi/typerpc2/RpcMemberType";
import { AnyRpcWithConfig, InferredRpcConfig } from "./RpcConfig";

export type InferredRpcHandlerConfig<
  T extends AnyRpcWithConfig
> = GenericConfigOrFactoryType<InferredRpcConfig<T>>;

export class BaseRpcConfigHandler<T extends AnyRpcWithConfig> {
  readonly rpcType!: RpcType<T>;

  constructor(readonly config: InferredRpcHandlerConfig<T>) {}

  protected _getContextualHandlerCache = new Map();

  protected _getHandler<T extends AnyRpcWithConfig, K extends keyof T>(
    this: BaseRpcConfigHandler<T>,
    memerName: string & K
  ): RpcMemberHandler<T[K]> {
    return this["handle" + capitalize(memerName)].bind(this);
  }

  getContextualHandler<
    T extends AnyRpcWithConfig,
    K extends ExtractKeys<T, RpcContextualMember>
  >(
    this: BaseRpcConfigHandler<T>,
    memberName: string & K
  ): Promise<RpcHandler<T[K]>> {
    return this._getContextualHandlerCache.touch(memberName, async () =>
      this._getHandler(memberName)(
        RpcMemberType.getValidRpcType(this.rpcType, memberName)
      )
    );
  }

  async getParametrialHandler<
    T extends AnyRpcWithConfig,
    K extends ExtractKeys<T, RpcParametrialMember>
  >(
    this: BaseRpcConfigHandler<T>,
    memberName: string & K,
    params: Parameters<T[K]>
  ): Promise<RpcHandler<ReturnType<T[K]>>> {
    return <any>(
      this._getHandler(memberName)(
        RpcMemberType.getValidRpcType(this.rpcType, memberName),
        ...params
      )
    );
  }
}

export interface RpcConfigHandlerType<
  T extends AnyRpcWithConfig = AnyRpcWithConfig,
  H = BaseRpcConfigHandler<T>
> {
  readonly rpcType: RpcType<T>;

  readonly rpcConfigType: "GENERIC" | "REGULAR" | "FUNCATION";

  readonly rpcConfigResolve: RpcConfigResolve<T>;

  new (config: InferredRpcHandlerConfig<T>): H;
}

export type RpcConfigType<
  T extends AnyRpcWithConfig,
  U = InferredRpcConfig<T>
> = U extends Fn ? If<IsGenericConfig<U>, "GENERIC", "FUNCATION"> : "REGULAR";

export type RpcConfigResolve<
  R extends AnyRpcWithConfig
> = InferredRpcConfig<R> extends AnyGenericConfig
  ?
      | GenericConfig2.ResolveFn<InferredRpcConfig<R>>
      | If<GenericConfig2.IsWithoutResolveFn<InferredRpcConfig<R>>, undefined>
  : undefined;

export type RpcConfigHandler<
  R extends AnyRpcWithConfig,
  H,
  E,
  OH = {}, // extra optional handler
  RH = {} // extra required handler
> = PartialUndefinedKeys<
  OH & {
    configType:
      | RpcConfigType<R>
      | If<Is<RpcConfigType<R>, "REGULAR">, undefined>;

    configResolve: RpcConfigResolve<R>;
  },
  RH & {
    custom?: E;
    handler: H & ThisType<{ config: InferredRpcHandlerConfig<R> } & E>;
  }
>;

export const RpcConfigHandlerMap = new WeakMap<RpcType, RpcConfigHandlerType>();
export function RpcConfigHandler<
  R extends AnyRpcWithConfig,
  H extends RpcHandler<R>,
  E extends object = {}
>(
  rpcType: RpcType<R>,
  rpcConfigHandler: RpcConfigHandler<R, H, E>
): RpcConfigHandlerType<R, H>;

export function RpcConfigHandler(
  rpcType,
  {
    handler,
    configType = "REGULAR",
    configResolve,
    custom = {},
  }: RpcConfigHandler<any, any, any>
) {
  class HandlerType extends BaseRpcConfigHandler<any> {
    static readonly rpcType = rpcType;

    static readonly rpcConfigType: any = configType;

    static readonly rpcConfigResolve = configResolve;

    readonly rpcType = rpcType;
  }

  Object.assign(HandlerType.prototype, custom, handler);

  Object.defineProperty(HandlerType, "name", {
    value: `RpcConfigHandler<${rpcType.name}>`,
  });

  RpcConfigHandlerMap.set(rpcType, HandlerType);
  return <any>HandlerType;
}
