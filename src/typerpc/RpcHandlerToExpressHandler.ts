import { Handler } from "express";
import { inspect } from "../logging";
import { RpcHandlerFn } from "./Rpc";

export function RpcHandlerToExpressHandler<T extends RpcHandlerFn>(
  handler: RpcHandlerFn
): Handler {
  return async (req, res) => {
    return res.json(await handler(req.body));
  };
}
