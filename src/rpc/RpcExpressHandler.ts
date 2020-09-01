import {Handler} from "express";
import {inspect} from "../logging";
import {RpcHandlerFn} from "./Rpc";

export function RpcExpressHandler<T extends RpcHandlerFn>(
    handler: RpcHandlerFn
): Handler {
    return async (req, res) => {
        // console.log(inspect(req.body, {depth: 100, colors: true}));
        return res.json(await handler(req.body));
    }
}
