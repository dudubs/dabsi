import RichTextModule from "@dabsi/system/rich-text";
import { RichTextImageEntity } from "@dabsi/system/rich-text-plugins/image/entities/ImageEntity";
import { Inject, Module } from "@dabsi/typedi";

const RichTextImageEntityType = "image";

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

        unpacked: { url: string; entityKey: string };

        readonly: { url: string };
      };
    }
  }
}

@Module()
export default class RichTextImageModule {
  // @Configure

  constructor(@Inject() richTextModule: RichTextModule) {
    richTextModule.install(plugins => {
      plugins.defineEntity("image", {
        entityType: RichTextImageEntity,
        mutability: { IMMUTABLE: true },

        selection: {
          relations: { imageFile: { pick: ["url"] } },
        },

        packEntityKey: unpackedData => {
          return unpackedData.entityKey;
        },

        pack: (_, row, { url }) => {
          return null;
        },

        unpack: (_, image) => {
          console.log({ image });

          return {
            url: image.imageFile!.url,
            entityKey: image.$key,
          };
        },

        readonlyKeys: ["url"],
      });
    });
  }
}
