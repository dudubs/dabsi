import {mapObject} from "../common/object/mapObject";
import {CommandOld} from "./CommandOld";
import {RPCOld, RPCClientOld} from "./RPCOld";

export type Commands = Record<string, CommandOld<any, any>>;

export type ServiceOld<T extends Commands> = RPCOld<{
    [K in keyof T]: RPCClientOld<T[K]>
}> & { commands: T };

export function ServiceOld<T extends Commands>(
    commands: T
): ServiceOld<T> {
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

export type AnyOldService = ServiceOld<any>;

export type ServiceCommandsOld<T extends AnyOldService> =
    T extends ServiceOld<infer U> ? U : never;

