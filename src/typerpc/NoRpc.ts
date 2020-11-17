import { If } from "../common/typings2/boolean";
import { Is } from "../common/typings2/boolean/Is";
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
