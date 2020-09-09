import {entries} from "../common/object/entries";
import {RpcConfig, RpcConnection, RpcError, RpcHandler} from "./Rpc";
import {AnyRpcMap, RpcMap} from "./RpcMap";

export type ServiceHandler<T extends AnyRpcMap> =
    (payload: [string, any]) => Promise<any>;


export type ServiceConfig<T extends AnyRpcMap> = {
    [K in keyof T]:
    RpcConfig<T[K]>
};

export type Service<T extends AnyRpcMap> =
    RpcMap<T> &
    RpcConnection<RpcMap<T>> ;


export function Service<T extends AnyRpcMap>(items: T):
    Service<T> {

    let handler: RpcHandler<RpcMap<T>> | undefined = undefined;
    const rpc: RpcMap<AnyRpcMap> = RpcMap(items);

    for (const [key, item] of entries(items)) {
        if (key in rpc) {
            throw new Error(`Can't override rpc property ${key}.`)
        }
        (<any>rpc)[key] = item.createRpcConnection(payload => {
            if (!handler)
                throw new RpcError(`No rpc handler for service.`)
            return handler([key, payload]);
        })
    }

    return Object.setPrototypeOf(<Pick<RpcMap<AnyRpcMap>, "createRpcConnection" | "createRpcHandler">>{
        createRpcConnection(_handler) {
            return rpc.createRpcConnection.call(this, handler = _handler);
        },

        createRpcHandler(config) {
            return handler = rpc.createRpcHandler.call(this, config)
        }
    }, rpc);

}
