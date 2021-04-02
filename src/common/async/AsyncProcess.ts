export class AsyncProcess {
  protected _promises = new Set<any>();
  protected _callbacks: (() => void)[] = [];

  protected _errors: any[] = [];

  wait(): Promise<void> {
    if (!this._promises.size) return Promise.resolve();
    return new Promise<void>((resolve, reject) => {
      this._callbacks.push(() => {
        this._errors.length ? reject(this._errors[0]) : resolve();
      });
    });
  }

  protected _emit() {
    const { _callbacks } = this;
    this._callbacks = [];
    for (const callback of _callbacks) {
      callback();
    }
  }

  push(promise: Promise<any> | (() => Promise<any>)) {
    if (this._errors.length) {
      console.log({ nErrors: this._errors.length });

      throw this._errors[0];
    }
    if (typeof promise === "function") {
      promise = promise();
    }
    this._promises.add(promise);

    promise
      .catch(error => {
        this._errors.push(error);
        this._emit();
      })
      .finally(() => {
        this._promises.delete(promise);
        if (this._promises.size) return;
        this._emit();
      });
  }
}
