import {Request, Response} from "express";
import {CommandHandlerOld} from "./CommandHandlerOld";
import {handleRPC} from "./RPCHandler";
import {AnyOldService, ServiceCommandsOld} from "./ServiceOld";

export type ServiceHandlers<T extends AnyOldService> = {
    [K in keyof ServiceCommandsOld<T>]: CommandHandlerOld<ServiceCommandsOld<T>[K]>
}

export function ServiceHandlerOld<T extends AnyOldService>(
    service: T,
    handlers: ServiceHandlers<T>
): (req: Request, res: Response) => void {

    return async ({body: {type, params}}, res) => {
        handleRPC(res, () => handlers[type](params))
    }
}
