import RichTextModule from "@dabsi/system/rich-text";
import StorageModule from "@dabsi/system/storage";
import { ImageFile } from "@dabsi/system/storage/entities/image";
import { Module } from "@dabsi/typedi";

declare global {
  namespace IRichText {
    interface Config {
      image?:
        | boolean
        | {
            min?: { width?: number; height?: number };
            max?: { width?: number; height?: number };
            // preview?: { width?: number; height?: number };
          };
    }
    interface RelationTypes {
      image: ImageFile;
    }

    interface EntityDataTypes {
      image: DataType<{}, { url: string }, { imageKey: string }>;
    }
  }
}

@Module({ dependencies: [StorageModule] })
export default class RichTextImageModule {
  // @Configure

  constructor(rtModule: RichTextModule) {
    rtModule //
      .defineRelation("image", ImageFile, {
        selection: { pick: ["url"] },
      })
      .defineBlock("image", {
        readonlyKeys: ["url"],
        pack: ({ imageKey }, c) => {
          c.packRelation("image", imageKey);
          return { imageKey };
        },
        unpack: ({ imageKey }, c) => {
          const image = c.unpackRelation("image", imageKey);
          return {
            url: image!.url,
            imageKey,
          };
        },
      });
  }
}
