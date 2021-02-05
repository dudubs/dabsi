import { User } from "@dabsi/system/acl/entities/User";
import RichTextModule from "@dabsi/system/rich-text";
import { RichTextMontionEntity } from "@dabsi/system/rich-text-plugins/mention/entities/MentionEntity";
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
    interface EntityChildren {
      montion: RichTextMontionEntity;
    }

    interface EntityDataTypes {
      montion: {
        packed: null;

        unpacked: { name: string; userKey: string; entityKey?: string };

        readonly: { name: string; userKey: string };
      };
    }
  }
}

@Module()
export default class RichTextLinkModule {
  constructor(@Inject() richTextModule: RichTextModule) {
    richTextModule.install(plugins => {
      return plugins.defineEntity("montion", {
        entityType: RichTextMontionEntity,
        mutability: { IMMUTABLE: true },
        selection: {
          relations: { user: { pick: ["loginName"] } },
        },
        packEntityKey: async ({ entityKey, userKey }) => {
          if (entityKey) {
            return entityKey;
          }
          return { user: userKey };
        },
        pack: () => null,
        unpack: (_, entity) => ({
          name: entity.user!.loginName || "",
          entityKey: entity.$key,
          userKey: entity.user!.$key,
        }),
        readonlyKeys: ["name", "userKey"],
      });
    });
  }
}
