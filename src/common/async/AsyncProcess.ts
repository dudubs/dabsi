type Task = (tick: number) => Promise<any>;

export default class AsyncProcess {
  protected _tasks: Task[] = [];

  protected _ticks = 0;

  protected _errors = new Set<any>();

  protected _callbacks: ((tick: number) => void)[] = [];

  protected _countRunningTasks = 0;

  catch(callback: () => any) {
    (async () => await callback())().catch(error => {
      this.push(() => Promise.reject(error));
    });
  }

  push(task: Task) {
    const isFirstTask = this._tasks.length === 0;
    this._tasks.push(task);

    isFirstTask &&
      setImmediate(() => {
        this._run();
      });
  }

  protected _emit(tick: number) {
    const { _callbacks } = this;
    this._callbacks = [];
    for (const callback of _callbacks) {
      callback(tick);
    }
  }

  protected _run(): Promise<number> {
    const tick = this._ticks++;
    const { _tasks } = this;
    this._tasks = [];

    return Promise.all(
      _tasks.toSeq().map(task => {
        this._countRunningTasks++;
        return task(tick).finally(() => {
          this._countRunningTasks--;
        });
      })
    )
      .then(() => {
        if (this._countRunningTasks) return;
        if (this._tasks.length) return;
        this._emit(tick);
      })
      .catch(error => {
        this._errors.add(error);
        this._emit(tick);
      })
      .then(() => tick);
  }

  reset() {
    this._errors.clear();
  }

  wait(): Promise<number> {
    for (const error of this._errors) {
      return Promise.reject(error);
    }

    if (!this._tasks.length && !this._countRunningTasks)
      return Promise.resolve(this._ticks);

    return new Promise<number>((resolve, reject) => {
      this._callbacks.push(tick => {
        for (const error of this._errors) {
          return reject(error);
        }
        resolve(tick);
      });
    });
  }

  waitAndPush(task: Task) {
    return this.wait().then(() => {
      this.push(task);
    });
  }

  async waitForLast() {
    while (true) {
      await this.wait();
      await new Promise(resolve => {
        setImmediate(resolve);
      });
      if (!this._tasks.length && !this._countRunningTasks) break;
    }
  }

  waitFor<T>(callback: () => Promise<T>): Promise<T> {
    return Promise.all([callback(), this.waitForLast()]).then(
      ([result]) => result
    );
  }
}
