import {defined} from "../common/object/defined";
import {entries} from "../common/object/entries";
import {mapObject} from "../common/object/mapObject";
import {Lazy} from "../common/patterns/lazy";
import {AwaitableType} from "../common/typings";
import {AnyRPC, RPC, RPCConfigOf, RPCConnectionOf, RPCHandler, RPCHandlerOf, RPCHandlerPayload} from "./RPC";

export type ServiceCommands = Record<string, AnyRPC>;

export type ServiceConnection<Commands extends ServiceCommands> =
    { [K in keyof Commands]: RPCConnectionOf<Commands[K]> };

export type ServiceCommandsHandler<Commands extends ServiceCommands> =
    ServiceHandler<{
        [K in keyof Commands]:
        RPCHandlerOf<Commands[K]>
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
    RPCConfigOf<Commands[K]>
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

    new(handler: ServiceCommandsHandler<Commands>):
        ServiceConnection<Commands>;

    (handler: ServiceCommandsHandler<Commands>):
        ServiceConnection<Commands>;

};

export function Service<Commands extends ServiceCommands>(commands: Commands):
    Service<Commands> {

    let defaultHandler: undefined | ServiceCommandsHandler<Commands>;


    Connection.commnads = commands;

    Connection.connect = function (handler: ServiceCommandsHandler<Commands>) {
        defaultHandler = handler;
        return mapObject(commands, (command, key: any) => {
            return command.connect(payload => {
                return handler([key, payload])
            })
        })
    }
    Connection.handle = function (keyToConfig): ServiceCommandsHandler<Commands> {

        const handlers = mapObject(commands,
            (command, key) => command.handle(
                keyToConfig[<any>key]
            )
        );


        defaultHandler = Handler;

        return Handler;

        function Handler([key, payload]) {
            return handlers[key].call(this, payload);
        }
    }

    for (let [key, command] of entries(commands)) {
        Object.defineProperty(Connection, key, {
            get: Lazy(() => command.connect(function (payload) {
                    if (!defaultHandler)
                        throw new Error(
                            `No service handler for "${this.name}".`
                        );
                    return defaultHandler([key, payload])
                })
            )
        })
    }

    return <any>Connection;

    function Connection(handler) {
        const obj = this instanceof Connection ? this : {};
        for (const [key, command] of entries(commands)) {
            obj[key] = command.connect(payload => handler([key, payload]))
        }
        return obj;
    }
}

