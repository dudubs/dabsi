import {Handler} from "express";
import {RpcHandler} from "./Rpc";

export function RpcExpressHandler<T extends RpcHandler>(
    handler: RpcHandler
): Handler {
    return async (req, res) =>
        res.json(await handler(req.body))
}
