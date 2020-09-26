import { RefCallback } from "react";
import { AnyInputConnection } from "./Input";
import { AnyInputView, InputView } from "./InputView";

export class InputViewChildren {
  readonly keyToView: Record<string, AnyInputView> = {};
  readonly keyToError: Record<string, AnyInputView> = {};

  childRef(key: string): RefCallback<AnyInputView> {
    return (view) => {
      if (view) {
        this.keyToView[key] = view;
      } else {
        delete this.keyToView[key];
        delete this.keyToError[key];
      }
    };
  }
}
