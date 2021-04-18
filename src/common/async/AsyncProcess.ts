import { locateError } from "@dabsi/typemodule/locateError";

export class AsyncProcess {
  protected _callbacks: (() => void)[] = [];

  protected _descriptors = new Set<() => string>();

  protected _errors: any[] = [];

  protected wait(): Promise<void> {
    if (!this._descriptors.size) return Promise.resolve();

    return new Promise<void>((resolve, reject) => {
      this._callbacks.push(() => {
        this._errors.length ? reject(this._errors[0]) : resolve();
      });
    });
  }

  protected _emit() {
    if (!this._callbacks.length) {
      if (this._errors[0]) {
        throw this._errors[0];
      }
      return;
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

  waitAndPush(descriptor: () => string, getPromise: () => Promise<any>) {
    return this.wait().then(() => {
      this.push(descriptor, getPromise);
    });
  }

  push(descriptor: () => string, getPromise: () => Promise<any>) {
    if (this._errors.length) {
      return;
    }

    this._descriptors.add(descriptor);

    getPromise()
      .catch(error => {
        // TODO: locate error by descriptor.
        this._errors.push(locateError(error, descriptor()));
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
