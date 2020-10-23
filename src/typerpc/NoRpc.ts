import { AbstractRpcHandler, IRpcHandler, Rpc, RpcCommand } from "./Rpc";

export type NoRpc = Rpc<{
  Payload: null;
  Result: null;
  Handler: {};
  Connection: null;
  Config: undefined;
  Props: {};
}>;

export const NoRpc: NoRpc = Rpc<NoRpc>({
  connect: () => null,
  handler: class
    extends AbstractRpcHandler<NoRpc>
    implements IRpcHandler<NoRpc> {
    async handle() {
      return null;
    }
  },
});
