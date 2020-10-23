import { Handler } from "express";
import { inspect } from "../logging";
import { RpcCommand } from "./Rpc";

export function RpcHandlerToExpressHandler<T extends RpcCommand>(
  handler: RpcCommand
): Handler {
  return async (req, res) => {
    return res.json(await handler(req.body));
  };
}
