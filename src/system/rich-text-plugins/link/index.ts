import RichTextModule from "@dabsi/system/rich-text";
import { Inject, Module } from "@dabsi/typedi";

declare global {
  interface RichTextInputConfig {
    allowLinks?: boolean;
  }
}

@Module()
export default class RichTextLinkModule {
  constructor(@Inject() richTextModule: RichTextModule) {}
}
