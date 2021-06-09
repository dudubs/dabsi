import React from "react";

export type ReactorCallback<T> = (value: T) => void | false;

export class Reactor<T> {
  protected _lastValue: T | undefined = undefined;
  protected _callbacks = new Set<ReactorCallback<T>>();

  emit(value: T) {
    this._lastValue = value;
    for (const callback of this._callbacks) {
      callback(value);
    }
  }

  use(): T | undefined {
    const [value, setValue] = React.useState(() => this._lastValue);
    React.useEffect(
      () =>
        this.listen(value => {
          setValue(value);
        }),
      []
    );
    return value;
  }

  listen(callback: ReactorCallback<T>): () => void {
    this._callbacks.add(callback);
    return () => {
      this._callbacks.delete(callback);
    };
  }
}
