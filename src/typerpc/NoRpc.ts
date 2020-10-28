import { If, Is } from "../common/typings";
import {
  AbstractRpcHandler,
  AnyRpc,
  IRpcHandler,
  Rpc,
  RpcCommand,
} from "./Rpc";

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
