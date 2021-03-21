import { Waiter } from "@dabsi/common/async/Waiter";
import { Tick } from "./Tick";

const debug = false;
export type TickerCallback<T> = (tick: number) => Promise<T>;

export class Ticker {
  protected _callbacks: ((tick: number) => Promise<any>)[] = [];

  protected _runCounter = 0;

  protected _countRunnningTicks = 0;

  protected _waiter = Waiter<void>();

  constructor() {}

  async push<T>(callback: TickerCallback<T>): Promise<T> {
    if (!this._callbacks.length) {
      this._run();
    }
    const waiter = Waiter();
    this._callbacks.push(async tick => {
      waiter.resolve(await callback(tick));
    });
    return waiter;
  }

  get currentTick(): number {
    return this._runCounter;
  }

  protected _resolved = false;

  get isPending(): boolean {
    return this._countRunnningTicks > 0 || this._callbacks.length > 0;
  }

  get isCompleted() {
    return this._resolved && !this.isPending;
  }

  async wait<T>(promise: Promise<T>): Promise<T> {
    const [result] = await Promise.all([
      promise.then(result => {
        this._resolved = true;
        if (this.isCompleted) {
          this._waiter.resolve();
        }
        return result;
      }),
      this._waiter,
    ]);
    return result;
  }

  protected _closed = false;

  protected async _run() {
    if (this._closed) return;
    await Tick();

    const { _callbacks } = this;
    if (!_callbacks.length) {
      return;
    }

    this._callbacks = [];
    const tick = this._runCounter++;

    for (const callback of _callbacks) {
      this._countRunnningTicks++;

      callback(tick)
        .then(() => {
          this._countRunnningTicks--;
          if (this.isCompleted) {
            this._waiter.resolve();
          }
        })
        .catch(error => {
          this._waiter.reject(error);
        });
    }
  }
}
