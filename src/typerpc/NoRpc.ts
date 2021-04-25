import { AbstractRpcHandler } from "./AbstractRpcHandler";
import { IRpcHandler, Rpc, RpcType } from "@dabsi/old-typerpc/Rpc";

export type NoRpc = Rpc<{
  Handler: {};
  Connection: {};
  Children: {};
  Config: undefined;
  Props: {};
}>;

export const NoRpc: NoRpc = Rpc<NoRpc>({
  connect: () => ({}),
  isConfigCanBeUndefined: true,
  type: () => NoRpc,
  handler: class
    extends AbstractRpcHandler<NoRpc>
    implements IRpcHandler<NoRpc> {
    async handle() {
      return null;
    }
  },
});

export type NoRpcType = RpcType<NoRpc>;
