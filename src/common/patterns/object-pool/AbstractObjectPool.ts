import { Timeout } from "@dabsi/common/async/Timeout";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { WeakId } from "@dabsi/common/WeakId";
import { inspect } from "@dabsi/logging/inspect";
import { ObjectPool, ObjectPoolOptions } from "./ObjectPool";

export default abstract class AbstractObjectPool<T extends object>
  implements ObjectPool<T> {
  static DEFAULT_CLOSE_TIMEOUT = 1000 * 10;
  static DEFAULT_ALIVE_TIMEOUT = 1000 * 10;
  static DEFAULT_MAX_CONNECTIONS = 10;

  protected abstract createInstance(): Awaitable<T>;
  protected abstract deleteInstance(conn: T): Awaitable;

  constructor(protected options: ObjectPoolOptions = {}) {}

  protected _acquiredInstanceMap = new Map<
    T,
    {
      timeout: Timeout;
    }
  >();

  protected _releasedInstanceMap = new Map<
    T,
    {
      timeout: Timeout;
    }
  >();

  [inspect.custom]() {
    return `<${this.constructor.name} acquired:${this._acquiredInstanceMap.size} relased:${this._releasedInstanceMap.size} waiters:${this._waiters.length}>`;
  }

  protected _waiters: ((instance: T) => void)[] = [];

  protected _acquireInstance(instance: T) {
    this._acquiredInstanceMap.set(instance, {
      timeout: setTimeout(() => {
        log.debug(() => `acquire timeout instance ${WeakId(instance)}`);

        this.release(instance);
      }, this.options.acquireTimeout || AbstractObjectPool.DEFAULT_ALIVE_TIMEOUT),
    });

    return instance;
  }

  async acquire(): Promise<T> {
    if (this._releasedInstanceMap.size) {
      const [[instance, info]] = this._releasedInstanceMap.entries();
      this._releasedInstanceMap.delete(instance);
      log.debug(() => `reuse<connect> instance #${WeakId(instance)} to waiter`);
      clearTimeout(info.timeout);
      return this._acquireInstance(instance);
    }

    if (
      this._acquiredInstanceMap.size >=
      (this.options.maxSize || AbstractObjectPool.DEFAULT_MAX_CONNECTIONS)
    ) {
      return new Promise(resolve => {
        this._waiters.push(resolve);
      });
    }

    log.debug(() => `create new instance`);
    return this._acquireInstance(await this.createInstance());
  }

  async release(instance: T) {
    const info = this._acquiredInstanceMap.get(instance);
    if (!info) {
      log.warn("Connection not in pool.");
      return;
    }
    clearTimeout(info.timeout);

    const waiter = this._waiters.shift();
    if (waiter) {
      log.debug(() => `reuse<waiter> instance #${WeakId(instance)}`);
      waiter(this._acquireInstance(instance));
      return;
    }

    this._releasedInstanceMap.set(instance, {
      timeout: setTimeout(() => {
        log.debug(() => `release timeout instance #${WeakId(instance)}`);
        this._releasedInstanceMap.delete(instance);
        this._acquiredInstanceMap.delete(instance);
        this.deleteInstance(instance);
      }, this.options.releaseTimeout || AbstractObjectPool.DEFAULT_CLOSE_TIMEOUT),
    });
  }
}
