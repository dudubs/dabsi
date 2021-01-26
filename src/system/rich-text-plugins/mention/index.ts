import User from "@dabsi/system/acl/entities/User";
import RichTextModule from "@dabsi/system/rich-text";
import { DataSource } from "@dabsi/typedata/source";
import { Inject, Module } from "@dabsi/typedi";

declare global {
  namespace IRichText {
    interface Config {
      mention?:
        | boolean
        | {
            source?: DataSource<User>;
          };
    }
  }
}

@Module()
export default class RichTextLinkModule {
  constructor(@Inject() richTextModule: RichTextModule) {}
}
