import {entries} from "../common/object/entries";
import {handleMappedRpc, MappedRpc, MappedRpcChildren} from "./MappedRpc";
import {RpcConfigType, RpcConnectionType, RpcHandlerType} from "./Rpc";

export type ServiceConnection<T extends MappedRpcChildren> =
    { [K in keyof T]: RpcConnectionType<T[K]> };


export type ServiceHandler<T extends MappedRpcChildren> =
    (payload: [string, any]) => Promise<any>;


export type ServiceConfig<T extends MappedRpcChildren> = {
    [K in keyof T]:
    RpcConfigType<T[K]>
};

export type Service<T extends MappedRpcChildren> =
    MappedRpc<T> &
    RpcConnectionType<MappedRpc<T>> &
    {
        handler?: RpcHandlerType<MappedRpc<T>>
        new(handler: RpcHandlerType<MappedRpc<T>>):
            RpcConnectionType<MappedRpc<T>>;
    };


export function Service<T extends MappedRpcChildren>(children: T):
    Service<T> {


    class StaticService {

        static handler;

        static children = children;

        constructor(handler) {
            for (const [key, child] of entries(children)) {
                this[key] = child.connect(payload => handler([key, payload]))
            }
        }

        static connect(handler) {
            return new this(StaticService.handler = handler);
        }

        static handle(config): any {
            const handler = handleMappedRpc(children, config);
            return StaticService.handler = handler
        }
    }

    for (const [key, child] of entries(children)) {
        StaticService[key] = child.connect(payload => {
            return StaticService.handler([key, payload])
        })
    }
    return <any>StaticService;


}

