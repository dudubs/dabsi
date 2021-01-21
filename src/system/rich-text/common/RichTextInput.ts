import RichTextPluginsRpc from "@dabsi/system/rich-text/common/RichTextPluginsRpc";
import type { RichTextInputValue } from "@dabsi/system/rich-text/common/RichTextInputValue";
import { Input } from "@dabsi/typerpc/input/Input";
import { RpcNamespace } from "@dabsi/typerpc/RpcNamespace";
import { RawDraftContentState } from "draft-js";
import requireRpcHandler from "../../../typerpc/requireRpcHandler";

declare global {
  namespace IRichText {
    interface ConfigAndElement {
      editable?: boolean;
      allowAll?: boolean;
    }

    interface InputConfig extends Config {}

    interface InputElement extends Element {}
  }
}

export type RichTextInputElement = IRichText.InputElement;

export type RichTextInputConfig = IRichText.InputConfig;

export type RichTextInput = Input<{
  ValueData: null | Draft.RawDraftContentState;

  Value: RichTextInputValue;

  Controller: {
    plugins: typeof RichTextPluginsRpc;
  };

  Props: {};

  Config: RichTextInputConfig;

  Element: IRichText.InputElement;

  ValueElement: null | Draft.RawDraftContentState;

  ValueConfig: string | { $key: string };

  Error: never;
}>;

export function RichTextInput(): RichTextInput {
  return Input<RichTextInput>({
    type: RichTextInput,
    handler: requireRpcHandler(__filename),
    children: { plugins: RichTextPluginsRpc },
    getValueDataFromValueElement(valueElement) {
      return valueElement;
    },
  });
}
