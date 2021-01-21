import RichTextImageModule from "@dabsi/system/rich-text-plugins/image";
import RichTextLinkModule from "@dabsi/system/rich-text-plugins/link";
import { Module } from "@dabsi/typedi";

@Module({
  dependencies: [RichTextLinkModule, RichTextImageModule],
})
export default class RichTextTestingModule {}
