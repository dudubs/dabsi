import {touchMap} from "../common/map/touchMap";

export type RpcGenericConfig<T extends (config: any) => any> =
    (configure: T) => ReturnType<T>


export function RpcGenericConfig<T extends RpcGenericConfig<any>>(
    genericConfig: T
): ReturnType<T>
export function RpcGenericConfig<T extends RpcGenericConfig<any>, R>(
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

export function RpcGenericConfigFn<T extends RpcGenericConfig<any>, U>(
    callback: (config: ReturnType<T>) => U
): (genericConfig: T) => U {
    return genericConfig => {
        return callback(RpcGenericConfig(genericConfig))
    }
}
