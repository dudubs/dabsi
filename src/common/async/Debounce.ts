export function Debounce(
  ms: number
): {
  (): Promise<boolean>;
  accept();
  cancel();
} {
  let timeout: any = null;
  let counter = 0;

  return <any>F;

  async function F() {
    let id = ++counter;
    if (timeout) clearTimeout(timeout);
    await new Promise<void>(resolve =>
      setTimeout(() => {
        resolve();
      }, ms)
    );
    return id === counter;
  }
}

export class Debounce2 {
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
