import { Ref } from "react";

export function setRef<T>(ref: Ref<T> | undefined, value: T) {
  if (typeof ref === "function") ref(value);
  else if (ref) {
    // @ts-ignore
    ref["current"] = value;
  }
}
