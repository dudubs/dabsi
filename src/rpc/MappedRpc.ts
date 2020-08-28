import {mapObject} from "../common/object/mapObject";
import {ContextualRpc} from "./ContextualRpc";
import {handleMappedRpc, MappedRpcHandler} from "./MappedRpcHandler";
import {RpcConfigType, RpcConnectionType, RpcHandlerType, RpcPayloadType, RpcResultType} from "./Rpc";
import {RpcMap} from "./RpcMap";


export type MappedRpc<T extends RpcMap> = ContextualRpc<{
    Static: {
        children: T
    }
    Context: {
        [K in keyof T]: RpcHandlerType<T[K]>
    }
    Config: {
        [K in keyof T]: RpcConfigType<T[K]>
    }
    Connection: {
        [K in keyof T]: RpcConnectionType<T[K]>
    }
    Handler: MappedRpcHandler<{
        [K in keyof T]: (payload: RpcPayloadType<T[K]>) => RpcResultType<T[K]>
    }>
}>;

export function MappedRpc<T extends RpcMap>(children: T): MappedRpc<T> {
    return ContextualRpc({
        static: {children},
        createConnection: (handler): any =>
            mapObject(children, (child, key) => child.createRpcConnection(payload =>
                handler([key, payload])
            )),
        createContext: (config): any =>
            mapObject(children, (child, key) => child.createRpcHandler(config[key])),
        createHandler: context => async payload => handleMappedRpc(payload, context,
            (payload, handler) => handler(payload)
        )
    })
}

