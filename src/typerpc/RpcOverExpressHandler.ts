import { Handler } from "express";
import { RpcCommand } from "./Rpc";

export function RpcOverExpressHandler<T extends RpcCommand>(
  command: RpcCommand
): Handler {
  return async (req: { body: any }, res: { json(result) }) => {
    return res.json(await command(req.body.path, req.body.body));
  };
}
