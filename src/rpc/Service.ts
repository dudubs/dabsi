import {entries} from "../common/object/entries";
import {RpcMap, AnyRpcMap} from "./RpcMap";
import {handleRpcMap} from "./RpcMapHandler";
import {RpcConfig, RpcConnection, RpcHandler} from "./Rpc";

export type ServiceHandler<T extends AnyRpcMap> =
    (payload: [string, any]) => Promise<any>;


export type ServiceConfig<T extends AnyRpcMap> = {
    [K in keyof T]:
    RpcConfig<T[K]>
};

export type Service<T extends AnyRpcMap> =
    RpcMap<T> &
    RpcConnection<RpcMap<T>> &
    {
        handler?: RpcHandler<RpcMap<T>>
        new(handler: RpcHandler<RpcMap<T>>):
            RpcConnection<RpcMap<T>>;
    };


export function Service<T extends AnyRpcMap>(children: T):
    Service<T> {


    class StaticService {

        static handler;

        static children = children;

        constructor(handler) {
            for (const [key, child] of entries(children)) {
                this[key] = child.createRpcConnection(
                    payload => handler([key, payload])
                )
            }
        }

        static createRpcConnection(handler) {
            return new this(StaticService.handler = handler);
        }

        static createRpcHandler(config): any {
            const handlers = {};
            return StaticService.handler = async payload => {

                return handleRpcMap(payload, children, (payload, child, key) => {
                    return (handlers[key] || (handlers[key] = child.createRpcHandler(
                        config[key]
                    )))
                    (payload)
                })
            }
        }
    }

    for (const [key, child] of entries(children)) {
        StaticService[key] = child.createRpcConnection(payload => {
            return StaticService.handler([key, payload])
        })
    }
    return <any>StaticService;


}
