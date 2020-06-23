import {Handler} from "express";
import {Awaitable} from "../common/typings";
import {AnyCommandOld, CommandParamsOld, CommandResultOld} from "./CommandOld";
import {handleRPC} from "./RPCHandler";

export type CommandHandlerOld<T extends AnyCommandOld> =
    (params: CommandParamsOld<T>) => Awaitable<CommandResultOld<T>>;

export function CommandHandlerOld<T extends AnyCommandOld>(
    command: T, handler: CommandHandlerOld<T>): Handler {
    return async (req, res) => {
        if (typeof req.body !== "object")
            throw new Error(`Invalid command body`)
        handleRPC(res, () => handler(req.body));
    }
}


