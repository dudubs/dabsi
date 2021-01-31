import RichTextModule from "@dabsi/system/rich-text";
import { RichTextImageEntity } from "@dabsi/system/rich-text-plugins/image/entities/ImageEntity";
import { Inject, Module } from "@dabsi/typedi";

declare global {
  namespace IRichText {
    interface Config {
      image?:
        | boolean
        | {
            min?: { width?: number; height?: number };
            max?: { width?: number; height?: number };
            preview?: { width?: number; height?: number };
          };
    }
    interface EntityChildren {
      image: RichTextImageEntity;
    }

    interface EntityDataTypes {
      image: {
        packed: null;

        unpacked: { url: string; key: string };

        readonly: { url: string };
      };
    }
  }
}

@Module()
export default class RichTextImageModule {
  constructor(@Inject() richTextModule: RichTextModule) {
    richTextModule.install(plugins => {
      plugins.defineEntity("image", {
        entityType: RichTextImageEntity,
        mutability: { IMMUTABLE: true },

        selection: {
          relations: { file: { pick: ["url"] } },
        },

        packEntityKey: unpackedData => unpackedData.key,

        pack: (_, row, { url }) => {
          return null;
        },

        unpack: (_, row) => ({
          url: row.file!.url,
          key: row.$key,
        }),

        readonlyKeys: ["url"],
      });
    });
  }
}
