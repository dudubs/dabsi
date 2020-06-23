import {Handler} from "express";
import {RPCHandler} from "./RPC";

export function ExpressRPCHandler<T extends RPCHandler>(
    handler: RPCHandler
): Handler {
    return async (req, res) =>
        res.json(await handler(req.body))
}
