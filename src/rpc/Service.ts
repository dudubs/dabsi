import {entries} from "../common/object/entries";
import {mapObject} from "../common/object/mapObject";
import {AwaitableType} from "../common/typings";
import {AnyRPC, RPC, RPCConfigOf, RPCConnectionOf, RPCHandler, RPCHandlerOf} from "./RPC";

export type ServiceCommands = Record<string, AnyRPC>;

export type ServiceConnection<Commands extends ServiceCommands> =
    { [K in keyof Commands]: RPCConnectionOf<Commands[K]> };

export type ServiceCommandsHandler<Commands extends ServiceCommands> =
    ServiceHandler<{ [K in keyof Commands]: RPCHandlerOf<Commands[K]> }>;

export type ServerHandlers = Record<string, RPCHandler>;

export type ServiceHandler<Handlers extends ServerHandlers> =

    (<K extends keyof Handlers>(
        data: {
            name: K,
            args: Parameters<Handlers[K]>
        }
    ) =>

        Promise<AwaitableType<ReturnType<Handlers[K]>>>);

export type ServiceConfig<Commands extends ServiceCommands> = {
    [K in keyof Commands]:
    RPCConfigOf<Commands[K]>
};

export type Service<Commands extends ServiceCommands> =
    RPC<ServiceCommandsHandler<Commands>, ServiceConnection<Commands>,
        ServiceConfig<Commands>> & {
    commands: Commands

    new(handler: ServiceCommandsHandler<Commands>): ServiceConnection<Commands>;
    (handler: ServiceCommandsHandler<Commands>): ServiceConnection<Commands>;

};

export function Service<Commands extends ServiceCommands>(commands: Commands):
    Service<Commands> {

    Connection.commnads = commands;
    Connection.connect = function (handler) {
        return mapObject(commands, (command, name: any) => {
            return command.connect(args => {
                return handler({name, args})
            })
        })
    }
    Connection.handle = function (commandNameToOptions) {
        const handlers = mapObject(commands, (command, name) =>
            command.handle(
                commandNameToOptions[<any>name]
            ));

        return Handler;

        function Handler({name, args}) {
            return handlers[name].call(this, args);
        }
    }

    return <any>Connection;

    function Connection(handler) {
        const obj = this instanceof Connection ? this : {};
        for (const [name, command] of entries(commands)) {
            obj[name] = (...args) => handler({name, args})
        }
        return obj;
    }
}

