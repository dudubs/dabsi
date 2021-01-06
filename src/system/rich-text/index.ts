import { DbModule } from "@dabsi/modules/DbModule";
import { Module } from "@dabsi/typedi";

@Module({
  dependencies: [DbModule],
})
export default class RichTextModule {}
