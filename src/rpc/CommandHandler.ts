import {Handler} from "express";
import {Awaitable} from "../common/typings";
import {AnyCommand, CommandParams, CommandResult} from "./Command";
import {handleRPC} from "./RPCHandler";

export type CommandHandler<T extends AnyCommand> =
    (params: CommandParams<T>) => Awaitable<CommandResult<T>>;

export function CommandHandler<T extends AnyCommand>(command: T,
                                                     handler: CommandHandler<T>): Handler {
    return async (req, res) => {
        if (typeof req.body !== "object")
            throw new Error(`Invalid command body`)
        handleRPC(res, () => handler(req.body));
    }
}
