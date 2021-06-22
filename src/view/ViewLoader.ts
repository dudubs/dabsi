import { Awaitable } from "@dabsi/common/typings2/Async";
import { Payload } from "@dabsi/common/typings2/Payload";
import { Reactor } from "@dabsi/view/Reactor";

export type ViewLoaderEvent = Payload<{
  start: {};
  progress: {
    total: number;
    complete: number;
  };
  complete: {};
}>;

const DEBUG = true;

export type ViewLoaderConfig = {
  setState(key: string, value: any): void;
  getState(key: string): any;
};
export class ViewLoader {
  protected _promises = new Set<Promise<any>>();

  protected _waiters: (() => void)[] = [];

  readonly reactor = new Reactor<ViewLoaderEvent>();

  _total = 0;

  _complete = 0;

  constructor(protected _config?: ViewLoaderConfig) {}

  configure(config: ViewLoaderConfig) {
    this._config = config;
  }

  protected _emitProgrssImmediate: ReturnType<
    typeof setImmediate
  > | null = null;

  protected _emitProgress() {
    this._emitProgrssImmediate ??= setImmediate(() => {
      this._emitProgrssImmediate = null;
      this.reactor.emit({
        type: "progress",
        total: this._total,
        complete: this._complete,
      });
    });
  }

  async loadWithState<T>(
    key: string,
    callback: () => Awaitable<T>
  ): Promise<T> {
    const state = this._config?.getState?.(key);
    if (state !== undefined) {
      DEBUG && console.debug({ loadFromState: key, state });
      return state;
    }
    const result = await this.load(callback);
    this._config?.setState?.(key, result);
    return result;
  }

  protected _emitProgressOrComplete() {
    this._total--;
    if (!this._promises.size) {
      this._total = 0;
      this.reactor.emit({ type: "complete" });
      this._waiters.forEach(done => {
        done();
      });
    } else {
      this._emitProgress();
    }
  }

  async load<T>(callback: () => Awaitable<T>): Promise<T> {
    const promise = (async () => callback())();

    this._total++;

    if (!this._promises.size) {
      this.reactor.emit({ type: "start" });
    } else {
      this._emitProgress();
    }

    this._promises.add(promise);

    promise.finally(() => {
      this._promises.delete(promise);
      this._emitProgressOrComplete();
    });

    return promise;
  }

  async wait() {
    if (!this._promises.size) {
      return;
    }
    return new Promise<void>(resolve => {
      this._waiters.push(() => resolve());
    });
  }
}

export default new ViewLoader();
