import { DbModule } from "@dabsi/system/core/DbModule";
import { Module } from "@dabsi/typedi";

@Module({
  dependencies: [DbModule],
})
export default class RichTextModule {}
