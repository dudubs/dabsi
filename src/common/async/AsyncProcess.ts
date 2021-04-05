export class AsyncProcess {
  protected _callbacks: (() => void)[] = [];

  protected _descriptors = new Set<() => string>();

  protected _errors: any[] = [];

  wait(): Promise<void> {
    if (!this._descriptors.size) return Promise.resolve();

    return new Promise<void>((resolve, reject) => {
      this._callbacks.push(() => {
        this._errors.length ? reject(this._errors[0]) : resolve();
      });
    });
  }

  protected _emit() {
    if (this._internval) {
      clearInterval(this._internval);

      this._internval = null;
    }
    const { _callbacks } = this;
    this._callbacks = [];
    for (const callback of _callbacks) {
      callback();
    }
  }

  log() {
    for (const descriptor of this._descriptors) {
      console.log(`- ${descriptor()}`);
    }
  }

  protected _internval: ReturnType<typeof setInterval> | null = null;

  push(descriptor: () => string, promise: Promise<any> | (() => Promise<any>)) {
    if (this._errors.length) {
      console.log({ nErrors: this._errors.length });

      throw this._errors[0];
    }
    if (typeof promise === "function") {
      promise = promise();
    }

    if (!this._internval) {
      this._internval = setInterval(() => {
        console.log("process still running:");
        this.log();
      }, 3000);
    }

    this._descriptors.add(descriptor);

    promise
      .catch(error => {
        this._errors.push(error);
        this._emit();
      })
      .finally(() => {
        this._descriptors.delete(descriptor);
        if (!this._descriptors.size) {
          this._emit();
        }
      });
  }
}
