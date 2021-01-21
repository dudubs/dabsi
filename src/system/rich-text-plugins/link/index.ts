import RichTextModule from "@dabsi/system/rich-text";
import { Inject, Module } from "@dabsi/typedi";

declare global {
  namespace IRichText {
    interface Config {
      allowLinks?: boolean;
    }
  }
}

@Module()
export default class RichTextLinkModule {
  constructor(@Inject() richTextModule: RichTextModule) {}
}
