import {Handler} from "express";
import {inspect} from "../logging";
import {RpcHandler} from "./Rpc";

export function RpcExpressHandler<T extends RpcHandler>(
    handler: RpcHandler
): Handler {
    return async (req, res) => {
        // console.log(inspect(req.body, {depth: 100, colors: true}));
        return res.json(await handler(req.body));
    }
}
