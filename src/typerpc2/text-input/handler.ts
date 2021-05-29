import { Awaitable } from "@dabsi/common/typings2/Async";
import {
  InputHandler,
  InputWithConfig,
} from "@dabsi/typerpc2/input/InputHandler";
import { TextInput } from "@dabsi/typerpc2/text-input/rpc";

declare module "./rpc" {
  interface TextInput
    extends InputWithConfig<
      TextInput,
      | {
          pattern?: RegExp;

          minLength?: number;

          maxLength?: number;

          load?: (text: string) => Awaitable<string>;

          trim?: string;

          titleCase?: boolean;
        }
      | undefined,
      string,
      string | undefined
    > {}
}

export default InputHandler(
  TextInput,
  { configCanBeUndefined: true },
  {
    getElement() {
      const { pattern } = this.config;
      return {
        pattern: pattern && [pattern.source, pattern.flags],
      };
    },
    getValueElement(value) {
      return value || "";
    },
    getValueFromConfig(valueConfig) {
      return valueConfig || "";
    },
    async loadAndCheck(data) {
      let value = String(data || "");
      if (this.config.trim) {
        value = value.trim();
      }

      if (this.config.titleCase) {
        value.replace(
          /\w+/g,
          word => word.charAt(0).toUpperCase() + word.slice(1)
        );
      }

      if (this.config.pattern && this.config.pattern.test(value)) {
        return { error: "INVALID_PATTERN" };
      }

      if (this.config.minLength && this.config.minLength > value.length) {
        return { error: "TOO_SHORT" };
      }

      if (this.config.maxLength && value.length > this.config.maxLength) {
        return { error: "TOO_LONG" };
      }

      if (this.config.load) {
        value = await this.config.load(value);
      }

      return { value };
    },
  }
);
