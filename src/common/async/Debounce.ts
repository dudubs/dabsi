export default class Debounce {
  protected _counter = 0;
  constructor(protected ms: number = 500) {}

  resolve: null | (() => void) = null;

  protected _timeout: null | ReturnType<typeof setTimeout> = null;
  async wait(ms = this.ms) {
    this._timeout && clearTimeout(this._timeout);
    const id = ++this._counter;

    await new Promise<void>(resolve => {
      this._timeout = setTimeout(
        (this.resolve = () => {
          this.resolve = null;
          resolve();
        }),
        ms
      );
    });
    return id === this._counter;
  }

  cancel() {
    this._counter++;
    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  }
}
