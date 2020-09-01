import {mapObject} from "../common/object/mapObject";
import {ContextualRpc} from "./ContextualRpc";
import {handleMappedRpc, MappedRpcHandler} from "./MappedRpcHandler";
import {RpcConfig, RpcConnection, RpcHandler, RpcPayload, RpcResult} from "./Rpc";
import {RpcMap} from "./RpcMap";


export type MappedRpc<T extends RpcMap> = ContextualRpc<{
    Props: {
        children: T
    }
    Context: {
        [K in keyof T]: RpcHandler<T[K]>
    }
    Config: {
        [K in keyof T]: RpcConfig<T[K]>
    }
    Connection: {
        [K in keyof T]: RpcConnection<T[K]>
    }
    Handler: MappedRpcHandler<{
        [K in keyof T]: (payload: RpcPayload<T[K]>) => RpcResult<T[K]>
    }>
}>;


export function MappedRpc<T extends RpcMap>(children: T): MappedRpc<T> {
    return <MappedRpc<T>>ContextualRpc<MappedRpc<any>>({
        props: {children},
        createConnection: (handler): any =>
            mapObject(children, (child, key) => child.createRpcConnection(payload =>
                handler([key, payload])
            )),
        createContext: (props, config): any =>
            mapObject(children, (child, key) =>
                child.createRpcHandler(config[key])),
        createHandler: (handlers: Record<any, (payload) => any>) => async payload =>
            handleMappedRpc(payload, handlers,
                (payload, handler) => handler(payload)
            )
    })
}

