import {mapObject} from "../common/object/mapObject";
import {Command} from "./Command";
import {RPC, RPCClient} from "./RPC";

export type Commands = Record<string, Command<any, any>>;

export type Service<T extends Commands> = RPC<{
    [K in keyof T]: RPCClient<T[K]>
}> & { commands: T };

export function Service<T extends Commands>(
    commands: T
): Service<T> {
    return {
        commands,
        connect: connection => {
            return <any>mapObject(commands, (rpc, type) => rpc.connect(
                params => connection({
                    type,
                    params
                })
            ))
        }
    }
}

export type AnyService = Service<any>;

export type ServiceCommands<T extends AnyService> =
    T extends Service<infer U> ? U : never;

