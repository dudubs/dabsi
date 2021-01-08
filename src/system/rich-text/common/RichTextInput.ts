import { RichTextInputHandler } from "@dabsi/system/rich-text/common/RichTextInputHandler";
import RichTextInputRpc from "@dabsi/system/rich-text/common/RichTextInputRpc";
import { Input } from "@dabsi/typerpc/input/Input";
import { RpcNamespace } from "@dabsi/typerpc/RpcNamespace";
import { RawDraftContentState } from "draft-js";

declare global {
  interface RichTextInputConfig {}
  interface RichTextInputElement {}
  interface RichTextInputValue {}
}

export type RichTextInput = Input<{
  ValueData: null | RawDraftContentState;

  Value: null | {
    entities: {
      $key: string;
    }[];
  };

  Controller: {
    plugins: RpcNamespace;
  };

  Props: {};

  Config: RichTextInputConfig;

  Element: RichTextInputElement;

  ValueElement: null | RawDraftContentState;

  ValueConfig: any;

  Error: never;
}>;

export function RichTextInput(): RichTextInput {
  return Input<RichTextInput>({
    type: RichTextInput,
    handler: RichTextInputHandler as any,
    children: { plugins: RichTextInputRpc },
    getValueDataFromValueElement(valueElement) {
      return valueElement;
    },
  });
}
