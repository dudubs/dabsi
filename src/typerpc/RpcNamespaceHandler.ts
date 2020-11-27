import { isConstructor } from "../common/object/isConstructor";
import { AbstractRpcHandler, IRpcHandler } from "./Rpc";
import { RpcNamespace } from "./RpcNamespace";

type T = RpcNamespace;

export class RpcNamespaceHandler
  extends AbstractRpcHandler<T>
  implements IRpcHandler<T> {
  nsInfo: {
    parent: RpcNamespaceHandler;
    key: string;
  } | null = null;

  async handle([key, payload]: any): Promise<any> {
    const target = this.rpc.namespaceMap[key];
    const unresolvedConfig = this.config.getNamespaceConfig(target, key, this);
    const handler = await target.resolveRpcHandler(unresolvedConfig, this);
    if (isConstructor(handler, RpcNamespaceHandler)) {
      handler.nsInfo = {
        parent: this,
        key,
      };
    }
    await this.config?.checkNamespace?.(this, handler);
    return handler.handle(payload);
  }
}
