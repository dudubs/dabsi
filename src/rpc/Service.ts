import {entries} from "../common/object/entries";
import {mapObject} from "../common/object/mapObject";
import {Lazy} from "../common/patterns/lazy";
import {AwaitableType} from "../common/typings";
import {AnyRpc, RPC, RpcAdapterOf, RpcConnectionOf, RPCHandler, RpcHandlerOf, RPCHandlerPayload} from "./RPC";

export type ServiceCommands = Record<string, AnyRpc>;

export type ServiceConnection<Commands extends ServiceCommands> =
    { [K in keyof Commands]: RpcConnectionOf<Commands[K]> };

export type ServiceCommandsHandler<Commands extends ServiceCommands> =
    ServiceHandler<{
        [K in keyof Commands]:
        RpcHandlerOf<Commands[K]>
    }>;

export type ServerHandlers = Record<string, RPCHandler>;

export type ServiceHandler<Handlers extends ServerHandlers> =
    (<K extends keyof Handlers>(
        payload: [K, RPCHandlerPayload<Handlers[K]>]
    ) =>

        Promise<AwaitableType<ReturnType<Handlers[K]>>>

        );

export type ServiceConfig<Commands extends ServiceCommands> = {
    [K in keyof Commands]:
    RpcAdapterOf<Commands[K]>
};


export type Service<Commands extends ServiceCommands> =
    RPC<//
        ServiceCommandsHandler<Commands>,
        ServiceConnection<Commands>,
        ServiceConfig<Commands>//
        >
    & ServiceConnection<Commands>
    & {
    commands: Commands

    handler?: ServiceCommandsHandler<Commands>;

    new(handler: ServiceCommandsHandler<Commands>):
        ServiceConnection<Commands>;

    (handler: ServiceCommandsHandler<Commands>):
        ServiceConnection<Commands>;

};

export function Service<Commands extends ServiceCommands>(commands: Commands):
    Service<Commands> {

    Class.handler = undefined;

    Class.commnads = commands;

    Class.connect = function (handler: ServiceCommandsHandler<Commands>) {

        Class.handler = handler;
        return mapObject(commands, (command, key: any) => {

            return command.connect(payload => {
                return handler([key, payload])
            })
        })
    }
    Class.handle = function (keyToAdapter): ServiceCommandsHandler<Commands> {

        const handlers = mapObject(commands,
            (command, key) => command.handle(
                keyToAdapter[<any>key]
            )
        );


        Class.handler = Handler;

        return Handler;

        function Handler([key, payload]) {
            return handlers[key].call(this, payload);
        }
    }

    for (let [key, command] of entries(commands)) {
        Object.defineProperty(Class, key, {
            get: Lazy(() => command.connect(function (payload) {
                    if (!Class.handler)
                        throw new Error(
                            `No service handler for "${this.name}".`
                        );
                    return Class.handler([key, payload])
                })
            )
        })
    }

    return <any>Class;

    function Class(handler) {
        const obj = this instanceof Class ? this : {};
        for (const [key, command] of entries(commands)) {
            obj[key] = command.connect(payload => handler([key, payload]))
        }
        return obj;
    }
}

