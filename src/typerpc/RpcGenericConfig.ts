import {touchMap} from "../common/map/touchMap";
import {Fn, Pluck} from "../common/typings";
import {AnyRpc, Rpc, RpcConfig} from "./Rpc";

declare const isGenericConfigFn: unique symbol;

export type RpcGenericConfigFn<T extends Fn = any> =
    {
        (configure: T): ReturnType<T>
        [isGenericConfigFn]?: true
    };


export type RpcConfigFactory<T, R extends AnyRpc, C = RpcConfig<R>, U extends any[] = []> =
    ($: (config: C, ...args: U) => { $: C }, context: T, ...args: U) => { $: C };

export function RpcConfigFactory<T, C, U extends any[]>(
    config: RpcConfigFactory<T, AnyRpc, C, U> | undefined,
    context: T,
    ...args: U
): C | undefined
export function RpcConfigFactory<T, C, U extends any[]>(
    config: RpcConfigFactory<T, AnyRpc, C>,
    context: T,
    ...args: U
): C
export function RpcConfigFactory(config, context, ...args) {
    return config($ => ({$: $}), context, ...args).$
}

export type AnyRpcWithGenericConfig = Rpc<{
    Handler: any,
    Config: RpcGenericConfigFn,
    Connection: any
}>;
export type RpcGenericConfig<T extends AnyRpcWithGenericConfig> =
    ReturnType<RpcConfig<T>>;


export type IsRpcGenericConfigFn<T extends Fn> =
    NonNullable<Pluck<T, typeof isGenericConfigFn>> extends true ? true : false;

export function RpcGenericConfig<T extends RpcGenericConfigFn>(
    genericConfig: T
): ReturnType<T> {
    return touchMap(genericConfigCache, genericConfig, () => genericConfig(x => x));
}

const genericConfigCache = new WeakMap();


export function RpcGenericConfigHandler<T extends AnyRpcWithGenericConfig, U,
    C>(
    callback: (config: C) => U
): (genericConfig: RpcGenericConfigFn<(config: C) => C>) => U

export function RpcGenericConfigHandler(callback) {
    return genericConfig => callback(
        RpcGenericConfig(genericConfig)
    );
}
