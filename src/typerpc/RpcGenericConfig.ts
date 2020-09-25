import {touchMap} from "../common/map/touchMap";
import {Fn, Pluck} from "../common/typings";
import {AnyRpc, Rpc, RpcConfig} from "./Rpc";

declare const isGenericConfigFn: unique symbol;

export type RpcGenericConfigFn<T extends Fn = any> =
    {
        (configure: T): ReturnType<T>
        [isGenericConfigFn]?: true
    };


export type ConfigFactory<T, C> = ($: (config: C) => { $: C }, context: T) => { $: C };

export type RpcConfigFactory<T, R extends AnyRpc> =
    ConfigFactory<T, RpcConfig<R>>

export function ConfigFactory<T, C>(
    config: ConfigFactory<T, C> | undefined,
    context: T,
): C | undefined
export function ConfigFactory<T, C>(
    config: ConfigFactory<T, C>,
    context: T,
): C
export function ConfigFactory(config, context) {
    return config?.($ => ({$: $}), context)?.$
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
    return touchMap(genericConfigCache, genericConfig, () => {
        if(typeof genericConfig!=="function") {
            console.log({genericConfig});
        }
        return genericConfig(x => x);
    });
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
