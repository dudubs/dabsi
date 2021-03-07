import { View } from "@dabsi/view/react/component/View";
import React, { useEffect } from "react";

const context = React.createContext<Pick<Loader, "load"> | null>(null);

export class Loader extends View<{
  children: React.ReactElement;
  onLoadStart?();
  onLoadEnd?();
}> {
  protected _callbacks = new Set<() => void>();
  protected _promises = new Set<Promise<any>>();

  load(promise: Promise<any>) {
    this._promises.add(
      (promise = promise.finally(() => {
        this._promises.delete(promise);
        if (!this._promises.size) {
          this.props.onLoadEnd?.();
        }
      }))
    );
    if (this._promises.size === 1) {
      this.props.onLoadStart?.();
    }
  }

  renderView() {
    return React.createElement(context.Provider, {
      value: this,
      children: this.props.children,
    });
  }

  static use<T>(callback: () => Promise<T>): T | null {
    const loader = React.useContext(context)!;
    const [state, setState] = React.useState<{ result: T } | { error } | null>(
      null
    );
    useEffect(() => {
      loader.load(
        callback()
          .then(result => {
            setState({ result });
          })
          .catch(error => {
            setState({ error });
          })
      );
    }, [loader]);

    if (state) {
      if ("error" in state) return state.error;
      return state.result;
    }
    return null;
  }
}
