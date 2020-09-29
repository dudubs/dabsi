import { RefCallback } from "react";
import { entries } from "../../common/object/entries";
import { hasKeys } from "../../common/object/hasKeys";
import { If } from "../../common/typings";
import { AnyInputConnection } from "./Input";
import { AnyInputView, InputView } from "./InputView";

export class InputViewChildren {
  keyToView: Record<string, AnyInputView> = {};
  keyToError: Record<string, any> = {};
  constructor() {}

  updateError(error) {
    this.keyToError = typeof error === "object" && error?.children;
  }

  ref(key: string): RefCallback<AnyInputView> {
    return (view) => {
      if (view) {
        if (this.keyToView[key] !== view) {
          delete this.keyToError[key];
        }
        this.keyToView[key] = view;
      } else {
        delete this.keyToView[key];
        delete this.keyToError[key];
      }
    };
  }

  async getError(): Promise<{ children: Record<string, any> } | undefined> {
    const keyToError = {};
    for (const [key, view] of entries(this.keyToView)) {
      await view.validate();
      const { error } = view;
      if (error != null) {
        keyToError[key] = error;
      }
    }
    if (hasKeys(keyToError)) return { children: keyToError };
  }
}
