import {entries} from "../common/object/entries";
import {mapObject} from "../common/object/mapObject";
import {Lazy} from "../common/patterns/lazy";
import {AnyRpc, Rpc, RpcConfigOf, RpcConnectionOf} from "./Rpc";

export type ServiceCommands = Record<string, AnyRpc>;
export const ServiceHandler = Symbol();

export type ServiceConnection<Commands extends ServiceCommands> =
    { [ServiceHandler]: ServiceHandler<Commands> } &
    { [K in keyof Commands]: RpcConnectionOf<Commands[K]> };


export type ServiceHandler<Commands extends ServiceCommands> =
    (payload: [string, any]) => Promise<any>;


export type ServiceConfig<Commands extends ServiceCommands> = {
    [K in keyof Commands]:
    RpcConfigOf<Commands[K]>
};

export type Service<Commands extends ServiceCommands> =
    Rpc<//
        ServiceHandler<Commands>,
        ServiceConnection<Commands>,
        ServiceConfig<Commands>//
        >
    & ServiceConnection<Commands>
    & {
    commands: Commands

    handler?: ServiceHandler<Commands>;

    new(handler: ServiceHandler<Commands>):
        ServiceConnection<Commands>;

    (handler: ServiceHandler<Commands>):
        ServiceConnection<Commands>;

};

export function Service<Commands extends ServiceCommands>(commands: Commands):
    Service<Commands> {

    Class.handler = undefined;

    Object.defineProperty(Class, ServiceHandler, {
        get() {
            return this.handler;
        }
    })

    Class.commnads = commands;

    Class.connect = function (handler: ServiceHandler<Commands>) {

        Class.handler = handler;

        const connection: ServiceConnection<any> =
            <any>mapObject(commands, (command, key: any) => {

                return command.connect(payload => {
                    return handler([key, payload])
                })
            });

        connection[ServiceHandler] = handler;

        return connection;
    }
    Class.handle = function (keyToAdapter): ServiceHandler<Commands> {

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

