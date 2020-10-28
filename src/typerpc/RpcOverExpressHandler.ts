import { Handler } from "express";
import { RpcCommand } from "./Rpc";

export function RpcOverExpressHandler<T extends RpcCommand>(
  handler: RpcCommand
): Handler {
  return async (req: { body: any }, res: { json(result) }) => {
    return res.json(await handler(req.body));
  };
}
