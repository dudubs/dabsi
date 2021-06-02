import { AnyRpc } from "./Rpc";

export class RpcError extends Error {
  constructor(message: string, rpc?: AnyRpc) {
    if (rpc?.rpcType) {
      message += ` <rpcType: ${rpc.rpcType.name}>`;
    }
    super(message);
  }
}
