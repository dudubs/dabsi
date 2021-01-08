import RichTextModule from "@dabsi/system/rich-text";
import { Inject, Module } from "@dabsi/typedi";

@Module()
export default class RichTextStylesModule {
  constructor(@Inject() richTextModule: RichTextModule) {}
}
