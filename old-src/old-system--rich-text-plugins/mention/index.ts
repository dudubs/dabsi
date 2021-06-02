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
            minChars?: number;
          };
    }
    interface RelationTypes {
      mention: User;
    }

    interface EntityDataTypes {
      mention: DataType<{ userKey: string }, { userKey: string; name: string }>;
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
        pack({ userKey }, c) {
          c.packRelation("mention", userKey);
          return { userKey };
        },
        unpack({ userKey }, c) {
          const user = c.unpackRelation("mention", userKey);
          return { name: user!.loginName!, userKey };
        },
      });
  }
}
