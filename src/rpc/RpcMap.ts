import {mapObject} from "../common/object/mapObject";
import {ContextualRpc} from "./ContextualRpc";
import {handleRpcMap, RpcMapHandler} from "./RpcMapHandler";
import {AnyRpc, RpcConfig, RpcConnection, RpcHandler, RpcPayload, RpcResult} from "./Rpc";


export type AnyRpcMap = Record<string, AnyRpc>;

export type RpcMap<T extends AnyRpcMap> = ContextualRpc<{
    Props: {
        items: T
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
    Handler: RpcMapHandler<{
        [K in keyof T]: (payload: RpcPayload<T[K]>) => RpcResult<T[K]>
    }>
}>;


export function RpcMap<T extends AnyRpcMap>(items: T): RpcMap<T> {
    return <any>ContextualRpc<RpcMap<AnyRpcMap>>({
        props: {items},
        createConnection: (handler, props): any =>
            mapObject(props.items, (child, key) => child.createRpcConnection(payload =>
                handler([key, payload])
            )),
        createContext: (props, config): any => {
            if (!config)
                throw new Error('No Config')
            return mapObject(props.items, (item, key) =>
                item.createRpcHandler(config[key]));
        },
        createHandler: (handlers: Record<any, (payload) => any>) => async payload =>
            handleRpcMap(payload, handlers,
                (payload, handler) => handler(payload)
            )
    })
}

