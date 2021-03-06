import { Awaitable } from "@dabsi/common/typings2/Async";
import { inspect } from "@dabsi/logging/inspect";
import {
  AnyRpc,
  AnyRpcHandler,
  RpcWithoutChildren,
  IRpcHandler,
  RpcChildren,
  RpcPayload,
  RpcResolvedConfig,
  RpcResolvedHandler,
  RpcUnresolvedConfig,
} from "@dabsi/old-typerpc/Rpc";
import { RpcError } from "@dabsi/old-typerpc/RpcError";

export abstract class AbstractRpcHandler<T extends AnyRpc>
  implements IRpcHandler<RpcWithoutChildren> {
  constructor(
    public rpc: T,
    public config: RpcResolvedConfig<T>,
    public parent: AnyRpcHandler
  ) {}

  handle(payload: RpcPayload<T>): Promise<any> {
    throw new RpcError(`No handle`);
  }

  protected getChildConfig?(
    key: string,
    child: AnyRpc
  ): Awaitable<RpcUnresolvedConfig<AnyRpc>> {
    const childConfigKey = `$${key}Config`;
    let childConfig = this[childConfigKey];

    if (childConfig !== null) {
      if (typeof childConfig === "function") {
        childConfig = childConfig.bind(this);
      }
      return childConfig;
    }

    throw new RpcError(`No childConfig for "${key}".`);
  }

  protected _childHandlerMapCache: Record<string, any> = {};

  async getChildHandler<K extends keyof RpcChildren<T>>(
    key: string & K
  ): Promise<RpcResolvedHandler<RpcChildren<T>[K]>> {
    if (this._childHandlerMapCache[key]) {
      return this._childHandlerMapCache[key];
    }
    const child = this.rpc.children[key];
    if (!child) {
      throw new RpcError(
        `No child "${key}". ${inspect(Object.keys(this.rpc.children))}`
      );
    }

    const config = await this.getChildConfig!(key, child);
    try {
      return (this._childHandlerMapCache[key] = await child.resolveRpcHandler(
        config,
        this as AnyRpcHandler
      )) as RpcResolvedHandler<RpcChildren<T>[K]>;
    } catch (error) {
      if (error instanceof RpcError) {
        throw new RpcError(`At key:${key}, ${error.message}`);
      }
      throw error;
    }
  }

  async routeAndHandle(path: any[], payload): Promise<any> {
    let handler = this as AnyRpcHandler;
    for (const key of path) {
      handler = await handler.route(key);
    }
    return handler.handle(payload);
  }

  async route(path): Promise<AnyRpcHandler> {
    return this.getChildHandler(path);
  }
}
