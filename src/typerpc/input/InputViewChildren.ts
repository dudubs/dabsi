import { RefCallback } from "react";
import { entries } from "../../common/object/entries";
import { hasKeys } from "../../common/object/hasKeys";
import { If } from "../../common/typings";
import { AnyInputConnection } from "./Input";
import { AnyInputView, InputView } from "./InputView";

export class InputViewChildren {
  keyToView: Record<string, AnyInputView> = {};

  constructor() {}

  async updateError(error) {
    const keyToError = (typeof error === "object" && error?.children) || {};
    for (const [key, view] of entries<AnyInputView>(this.keyToView)) {
      view.setError(keyToError[key]);
    }
  }

  ref(key: string): RefCallback<AnyInputView> {
    return (view) => {
      if (view) {
        this.keyToView[key] = view;
      } else {
        delete this.keyToView[key];
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
