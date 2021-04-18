import {
  InputHandler,
  InputWithConfig,
} from "@dabsi/typerpc2/input/InputHandler";
import { InputValue } from "@dabsi/typerpc2/input/Input";
import { TextInput } from "@dabsi/typerpc2/text-input/Input";

declare module "./rpc" {
  interface TextInput
    extends InputWithConfig<
      TextInput,
      | {
          pattern?: RegExp;
        }
      | undefined,
      string,
      string
    > {}
}

// InputWithCustomError<Error>()(TextInput)
// InputWithCustomValue<>()()
// CustomInput<Error,Value>

export default InputHandler(TextInput, {
  handler: {
    checkAndLoad(data) {
      return { type: "value", value: "" };
    },
    getValueElement(value) {
      return value || "";
    },
  },
});
(null as InputValue<TextInput>).asd;
