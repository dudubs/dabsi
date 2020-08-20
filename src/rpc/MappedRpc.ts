import {mapObject} from "../common/object/mapObject";
import {Union} from "../common/typings";
import {logDebug} from "../logging";
import {AnyRpc, Rpc, RpcConfigType, RpcConnectionType, RpcError, RpcHandler, RpcPayloadType} from "./Rpc";

export type MappedRpcChildren = Record<string, AnyRpc>;


export type MappedRpc<T extends MappedRpcChildren> = Rpc<{
    Handler:
        RpcHandler<Union<{ [K in keyof T]: [K, RpcPayloadType<T[K]>] }>>,
    Connection:
        { [K in keyof T]: RpcConnectionType<T[K]> }
    Config:
        { [K in keyof T]: RpcConfigType<T[K]> }
}> & { children: T };

export function MappedRpc<T extends MappedRpcChildren>(children: T): MappedRpc<T> {
    return {
        children,
        connect: handler => <any>mapObject(children, (child, key) => {
            console.log({child, key});
            return child.connect(payload => {
                return handler([key, payload])
            })
        }),
        handle: config =>
            handleMappedRpc(children, config)
    }
}

export function handleMappedRpc(children, config) {
    return async ([key, payload]) => {
        // console.log(`rpc at ${key}`);
        const child = children[key];
        if (!child) {
            throw new RpcError(`No mapped rpc for "${key}".`)
        }
        try {
            return await child.handle(config[key])(payload)
        } catch (error) {
            if (error instanceof RpcError) {
                return new RpcError(`at ${key}: ${error.message}`)
            }
            throw error;
        }
    }
}
