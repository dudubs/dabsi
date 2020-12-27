import { WeakId } from "@dabsi/common/WeakId";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Logger } from "@dabsi/logging/Logger";
import { Timeout } from "./DevTests";

export default class GenericConnectionPool<T extends object> {
  static DEFAULT_CLOSE_TIMEOUT = 1000 * 10;
  static DEFAULT_ALIVE_TIMEOUT = 1000 * 10;
  static DEFAULT_MAX_CONNECTIONS = 10;

  constructor(
    protected create: () => Awaitable<T>,
    protected close: (conn: T) => Awaitable,
    protected options: {
      maxConnections?: number;
      closeTimeout?: number;
      aliveTimeout?: number;
      logger?: Logger;
    } = {}
  ) {}

  protected _aliveConnectionMap = new Map<
    T,
    {
      timeout: Timeout;
    }
  >();
  protected _releasedConnectionMap = new Map<
    T,
    {
      timeout: Timeout;
    }
  >();

  protected _waiters: ((connection: T) => void)[] = [];

  protected _useConnection(connection: T) {
    this._aliveConnectionMap.set(connection, {
      timeout: setTimeout(() => {
        this._aliveConnectionMap.delete(connection);
        this.close(connection);
      }, this.options.aliveTimeout || GenericConnectionPool.DEFAULT_ALIVE_TIMEOUT),
    });

    return connection;
  }

  async connect(): Promise<T> {
    if (this._releasedConnectionMap.size) {
      this.log.trace(
        () => `reuse<connect> connection #${WeakId(connection)} to waiter`
      );
      const [[connection, info]] = this._releasedConnectionMap.entries();
      clearTimeout(info.timeout);
      return this._useConnection(connection);
    }

    if (
      this._aliveConnectionMap.size >=
      (this.options.maxConnections ||
        GenericConnectionPool.DEFAULT_MAX_CONNECTIONS)
    ) {
      return new Promise(resolve => {
        this._waiters.push(resolve);
      });
    }

    this.log.trace(() => `create new connection`);
    return this._useConnection(await this.create());
  }

  log = this.options.logger || log;

  async release(connection: T) {
    const info = this._aliveConnectionMap.get(connection);
    if (!info) {
      log.warn("Connection not in pool.");
      return;
    }
    clearTimeout(info.timeout);

    const waiter = this._waiters.shift();
    if (waiter) {
      this.log.trace(() => `reuse<waiter> connection #${WeakId(connection)}`);
      waiter(this._useConnection(connection));
      return;
    }

    this._releasedConnectionMap.set(connection, {
      timeout: setTimeout(() => {
        this.log.trace(() => `release connection #${WeakId(connection)}`);
        this._releasedConnectionMap.delete(connection);
        this._aliveConnectionMap.delete(connection);
        this.close(connection);
      }, this.options.closeTimeout || GenericConnectionPool.DEFAULT_CLOSE_TIMEOUT),
    });
  }
}
