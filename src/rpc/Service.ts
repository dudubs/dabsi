import {entries} from "../common/object/entries";
import {MappedRpc} from "./MappedRpc";
import {handleMappedRpc} from "./MappedRpcHandler";
import {RpcConfig, RpcConnection, RpcHandler} from "./Rpc";
import {RpcMap} from "./RpcMap";

export type ServiceHandler<T extends RpcMap> =
    (payload: [string, any]) => Promise<any>;


export type ServiceConfig<T extends RpcMap> = {
    [K in keyof T]:
    RpcConfig<T[K]>
};

export type Service<T extends RpcMap> =
    MappedRpc<T> &
    RpcConnection<MappedRpc<T>> &
    {
        handler?: RpcHandler<MappedRpc<T>>
        new(handler: RpcHandler<MappedRpc<T>>):
            RpcConnection<MappedRpc<T>>;
    };


export function Service<T extends RpcMap>(children: T):
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

                return handleMappedRpc(payload, children, (payload, child, key) => {
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
