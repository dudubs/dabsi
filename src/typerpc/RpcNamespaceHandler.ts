import { AbstractRpcHandler, IRpcHandler } from "./Rpc";
import { RpcNamespace } from "./RpcNamespace";

type T = RpcNamespace;

export class RpcNamespaceHandler
  extends AbstractRpcHandler<T>
  implements IRpcHandler<T> {
  async handle([key, payload]: any): Promise<any> {
    const target = this.rpc.targetMap[key];
    const config = this.config.getTargetConfig(target, key);
    return (await target.resolveRpcHandler(config)).handle(payload);
  }
}
