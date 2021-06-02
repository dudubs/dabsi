import RichTextModule from "@dabsi/system/rich-text";
import { Module } from "@dabsi/typedi";

@Module({
  dependencies: [RichTextModule],
})
export default class ContentManagementModule {}
