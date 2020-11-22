import { AbstractRpcHandler, IRpcHandler, Rpc } from "./Rpc";

export type NoRpc = Rpc<{
  Handler: {};
  Connection: {};
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
