import { RefCallback } from "react";
import { entries } from "@dabsi/common/object/entries";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { If } from "@dabsi/common/typings2/boolean";
import { AnyInputConnection } from "@dabsi/old-typerpc/input/Input";
import { InputErrorMap } from "@dabsi/old-typerpc/input/input-map/InputMap";
import { AnyInputView, InputView } from "@dabsi/old-typerpc/input/InputView";

export class InputViewChildren {
  viewMap: Record<string, AnyInputView> = {};

  constructor() {}

  async updateError(error) {
    const errorMap = (typeof error === "object" && error?.errorMap) || {};
    for (const [key, view] of entries<AnyInputView>(this.viewMap)) {
      view.setError(errorMap[key]);
    }
  }

  ref(key: string): RefCallback<AnyInputView> {
    return view => {
      if (view) {
        this.viewMap[key] = view;
      } else {
        delete this.viewMap[key];
      }
    };
  }

  async getError(): Promise<InputErrorMap<any> | undefined> {
    const errorMap = {};
    for (const [key, view] of entries(this.viewMap)) {
      await view.validate();
      const { error } = view;
      if (error != null) {
        errorMap[key] = error;
      }
    }
    if (hasKeys(errorMap)) return { type: "ERROR_MAP", errorMap };
  }
}
