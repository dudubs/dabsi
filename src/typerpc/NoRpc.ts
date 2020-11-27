import { AbstractRpcHandler, IRpcHandler, Rpc, RpcType } from "./Rpc";

export type NoRpc = Rpc<{
  Handler: {};
  Connection: {};
  Children: {};
  Config: undefined;
  Props: {};
}>;

export const NoRpc: NoRpc = Rpc<NoRpc>({
  connect: () => ({}),
  handler: class
    extends AbstractRpcHandler<NoRpc>
    implements IRpcHandler<NoRpc> {
    async handle() {
      return null;
    }
  },
});

export type NoRpcType = RpcType<NoRpc>;
