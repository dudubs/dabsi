import RichTextModule from "@dabsi/system/rich-text";
import { Inject, Module } from "@dabsi/typedi";

declare global {
  interface RichTextInputConfig {
    allowTables?: boolean;
  }

  interface RichTextInputElement {
    withTables: boolean;
  }
}
@Module()
export default class RichTextTableModule {
  constructor(@Inject() richTextModule: RichTextModule) {
    richTextModule.install(plugins => {
      plugins.buildInputElement((config, element) => {
        if (config.allowTables) {
          element.withTables = true;
        }
      });
    });
  }
}
