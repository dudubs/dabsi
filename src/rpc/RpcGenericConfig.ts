import {touchMap} from "../common/map/touchMap";
import {Fn} from "../common/typings";
import {AnyRpc, Rpc, RpcConfig} from "./Rpc";


export type RpcGenericConfigFn<T extends Fn = any> =
    (configure: T) => ReturnType<T>;

export type RpcGenericConfig<T extends AnyRpcWithGenericConfig> =
    ReturnType<RpcConfig<T>>;


export function RpcGenericConfig<T extends RpcGenericConfigFn>(
    genericConfig: T
): ReturnType<T>

export function RpcGenericConfig<T extends RpcGenericConfigFn, R>(
    genericConfig: T,
    callback: (config: ReturnType<T>) => R
): R


export function RpcGenericConfig(genericConfig, callback?) {
    const config = touchMap(cache, genericConfig, () => genericConfig(x => x));
    if (callback)
        return callback(config)
    return config;
}

const cache = new WeakMap();

export type AnyRpcWithGenericConfig = Rpc<{
    Handler: any,
    Config: RpcGenericConfigFn,
    Connection: any
}>;

export function RpcGenericConfigFn<T extends AnyRpcWithGenericConfig, U>(
    callback: (config: ReturnType<RpcConfig<T>>) =>
        U
): (genericConfig: RpcConfig<T>) => U {
    return genericConfig => {
        return callback(RpcGenericConfig(genericConfig))
    }
}
