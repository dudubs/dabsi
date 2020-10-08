import { useEffect, useState } from "react";
import { Lang } from "../../localization/Lang";
import { RpcConnection } from "../Rpc";
import { InputView, InputViewProps, useInputView } from "./InputView";
import { StringSchema } from "./StringSchema";
import { TextInput } from "./TextInput";

export function useTextInputView<C extends RpcConnection<TextInput>>(
  props: InputViewProps<C>
): { readonly text: string; setText(value: string): void; view: InputView<C> } {
  const view = useInputView(props, {
    validate(value) {
      return StringSchema.check(value, view.element);
    },
    renderDefaultError(error) {
      switch (error) {
        case "INVALID_PATTERN":
          return Lang`INVALID_PATTERN`;

        case "REQUIRED":
          return Lang`REQUIRED`;

        case "TOO_LONG":
          return Lang`REQUIRED_MAXIMUM_${"max"}_CHARACTERS`({
            max: view.element?.maxLength,
          });

        case "TOO_SHORT":
          return Lang`REQUIRED_MINIMUM_${"min"}_CHARACTERS`({
            min: view.element?.minLength,
          });
      }
    },
    inputWillValidate() {
      return view.setValue(text);
    },
  });

  const [text, setText] = useState(view.value);
  useEffect(() => {
    if (view.value !== text) {
      setText(view.value);
    }
  }, [view.value]);

  return {
    view,
    text,
    setText(text) {
      setText(StringSchema.get(text, view.element));
    },
  };
}
