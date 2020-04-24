import {Request, Response} from "express";
import {CommandHandler} from "./CommandHandler";
import {handleRPC} from "./RPCHandler";
import {AnyService, ServiceCommands} from "./Service";

export type ServiceHandlers<T extends AnyService> = {
    [K in keyof ServiceCommands<T>]: CommandHandler<ServiceCommands<T>[K]>
}

export function ServiceHandler<T extends AnyService>(
    service: T,
    handlers: ServiceHandlers<T>
): (req: Request, res: Response) => void {

    return async ({body: {type, params}}, res) => {
        handleRPC(res, () => handlers[type](params))
    }
}
