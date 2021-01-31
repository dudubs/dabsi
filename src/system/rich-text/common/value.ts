import { Awaitable } from "@dabsi/common/typings2/Async";
import { RichTextConfig } from "@dabsi/system/rich-text/common/types";

export interface RichTextInputValue {
  config: RichTextConfig;

  getContent(): Awaitable<null | Draft.RawDraftContentState>;
}
