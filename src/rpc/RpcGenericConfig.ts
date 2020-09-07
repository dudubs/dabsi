import {touchMap} from "../common/map/touchMap";
import {Fn, Pluck} from "../common/typings";
import {Rpc, RpcConfig} from "./Rpc";

declare const isGenericConfigFn: unique symbol;

export type RpcGenericConfigFn<T extends Fn = any> =
    {
        (configure: T): ReturnType<T>
        [isGenericConfigFn]?: true
    };

export type RpcGenericConfig<T extends AnyRpcWithGenericConfig> =
    ReturnType<RpcConfig<T>>;


export type AnyRpcWithGenericConfig = Rpc<{
    Handler: any,
    Config: RpcGenericConfigFn,
    Connection: any
}>;

export type IsRpcGenericConfigFn<T extends Fn> =
    NonNullable<Pluck<T, typeof isGenericConfigFn>> extends true ? true : false;

export function RpcGenericConfig<T extends RpcGenericConfigFn>(
    genericConfig: T
): ReturnType<T> {
    return touchMap(genericConfigCache, genericConfig, () => genericConfig(x => x));
}

const genericConfigCache = new WeakMap();


export function RpcGenericConfigHandler<T extends AnyRpcWithGenericConfig, U>(
    callback: (config: ReturnType<RpcConfig<T>>) =>
        U
): (genericConfig: RpcConfig<T>) => U

export function RpcGenericConfigHandler(callback) {
    return genericConfig => callback(
        RpcGenericConfig(genericConfig)
    );
}
