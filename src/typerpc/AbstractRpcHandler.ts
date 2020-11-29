import { Lazy } from "../common/patterns/lazy";
import { Awaitable } from "../common/typings2/Async";
import { Override } from "../common/typings2/Override";
import {
  _RpcResolvedConfig,
  AnyRpc,
  RpcError,
  RpcPayload,
  RpcResolvedHandler,
  RpcType,
  RpcUnresolvedConfig,
  RpcResolvedConfig,
  RpcChildren,
  RpcChild,
  AnyRpcHandler,
  IRpcHandler,
  Rpc,
} from "./Rpc";

export type IRpc = Rpc<
  Override<
    RpcType<AnyRpc>,
    {
      Children: {};
    }
  >
>;

export abstract class AbstractRpcHandler<T extends AnyRpc>
  implements IRpcHandler<IRpc> {
  constructor(
    public rpc: T,
    public config: RpcResolvedConfig<T>,
    public parent: AnyRpcHandler
  ) {}

  handle(payload: RpcPayload<T>): Promise<any> {
    throw new RpcError(`No handle`);
  }

  protected getChildConfig?(
    key: string
  ): Awaitable<RpcUnresolvedConfig<AnyRpc>> {
    throw new RpcError(`No childConfig for "${key}".`);
  }

  protected _childHandlerMapCache: Record<string, any> = {};
  async getChildHandler<K extends keyof RpcChildren<T>>(
    key: string & K
  ): Promise<RpcResolvedHandler<RpcChildren<T>[K]>> {
    if (this._childHandlerMapCache[key]) return this._childHandlerMapCache[key];
    const child = this.rpc.children[key];
    if (!child) throw new RpcError(`No child "${key}".`);
    const childConfigKey = `$${key}Config`;
    const childConfig = this[childConfigKey];
    if (childConfig === null) {
      throw new RpcError(`Can't resolve child key "${key}".`);
    }
    try {
      const config = childConfig ?? (await this.getChildConfig!(key));

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
    for (const [key] of path) {
      handler = await handler.route(key);
    }
    return handler.handle(payload);
  }

  async route(path): Promise<AnyRpcHandler> {
    return this.getChildHandler(path);
  }
}
