import RichTextImageModule from "@dabsi/system/rich-text-plugins/image";
import RichTextLinkModule from "@dabsi/system/rich-text-plugins/link";
import RichTextTableModule from "@dabsi/system/rich-text-plugins/table";
import { Module } from "@dabsi/typedi";

@Module({
  dependencies: [RichTextLinkModule, RichTextImageModule, RichTextTableModule],
})
export default class RichTextTestingModule {}
