import { Awaitable } from "@dabsi/common/typings2/Async";
import { RichTextRpc } from "@dabsi/system/rich-text/common/rpc";
import { RichTextContent } from "@dabsi/system/rich-text/common/content";

import { Input } from "@dabsi/typerpc/input/Input";
import requireRpcHandler from "../../../typerpc/requireRpcHandler";

declare global {
  namespace IRichText {
    interface ConfigAndElement {
      editable?: boolean;
    }

    interface InputConfig extends Config {}

    interface InputElement extends Element {}
  }
}

export type RichTextInputElement = IRichText.InputElement;

export type RichTextInputConfig = IRichText.InputConfig;

export type RichTextInput = Input<{
  ValueData: null | RichTextContent.Unpacked;

  Value: () => Awaitable<null | RichTextContent.Unpacked>;

  Controller: {
    plugins: typeof RichTextRpc;
  };

  Props: {};

  Config: RichTextInputConfig;

  Element: IRichText.InputElement;

  ValueElement: null | RichTextContent.Unpacked;

  ValueConfig: () => Awaitable<null | RichTextContent.Unpacked>;

  Error: never;
}>;

export function RichTextInput(): RichTextInput {
  return Input<RichTextInput>({
    type: RichTextInput,
    handler: requireRpcHandler(__filename),
    children: { plugins: RichTextRpc },
    getValueDataFromValueElement(valueElement) {
      return valueElement;
    },
  });
}
