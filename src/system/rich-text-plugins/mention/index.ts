import { User } from "@dabsi/system/acl/entities/User";
import RichTextModule from "@dabsi/system/rich-text";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { DataSource } from "@dabsi/typedata/source";
import { Module } from "@dabsi/typedi";

declare global {
  namespace IRichText {
    interface Config {
      mention?:
        | boolean
        | {
            source?: DataSource<User>;
            field?: DataExp<User>;
            minCharsForSuggestions?: number;
          };
    }
    interface RelationTypes {
      mention: User;
    }

    interface EntityDataTypes {
      mention: EntityDataType<
        { userKey: string },
        { userKey: string; name: string }
      >;
    }
  }
}

@Module()
export default class RichTextLinkModule {
  constructor(rtModule: RichTextModule) {
    rtModule //
      .defineRelation("mention", User, {
        selection: config => ({
          pick: [],
          fields: {
            mentionName:
              typeof config.mention === "object"
                ? config.mention.field
                : undefined ?? "loginName",
          },
        }),
      })
      .defineEntity("mention", {
        pack(c, { userKey }) {
          c.packRelation("mention", userKey);
          return { userKey };
        },
        unpack(c, { userKey }) {
          const user = c.unpackRelation("mention", userKey);
          return { name: user!.loginName!, userKey };
        },
      });
  }
}
