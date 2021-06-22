import React from "react";

export default function updateRef<T>(ref: React.Ref<T> | undefined, value: T) {
  if (ref)
    switch (typeof ref) {
      case "function":
        return ref(value);
      case "object":
        // @ts-expect-error
        ref["current"] = value;
    }
}
