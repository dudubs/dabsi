import { AbstractRpcHandler } from "@dabsi/typerpc/AbstractRpcHandler";
import { IRpcHandler, Rpc, RpcType } from "@dabsi/typerpc/Rpc";

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
