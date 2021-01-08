import RichTextModule from "@dabsi/system/rich-text";
import RichTextImageRpc from "@dabsi/system/rich-text-plugins/image/common/RichTextImagRpc";
import { RichTextImageEntity } from "@dabsi/system/rich-text-plugins/image/entities/ImageEntity";
import {
  RichTextEntityChildren,
  RichTextEntitySelection,
} from "@dabsi/system/rich-text/getRichTextEntityUnion";
import { DataSelection } from "@dabsi/typedata/data-selection/DataSelection";
import { Inject, Module } from "@dabsi/typedi";
import { RpcError } from "@dabsi/typerpc/Rpc";

declare global {
  interface RichTextInputConfig {
    image?:
      | boolean
      | {
          min?: { width?: number; height?: number };
          max?: { width?: number; height?: number };
          preview?: { width?: number; height?: number };
        };
  }
  interface RichTextInputElement {
    image: {};
  }

  interface RichTextEntityChildren {
    image: typeof RichTextImageEntity;
  }
}

@Module()
export default class RichTextImageModule {
  constructor(@Inject() richTextModule: RichTextModule) {
    RichTextEntityChildren.image = RichTextImageEntity;

    richTextModule.install(plugins => {
      plugins.configureInputRpc(RichTextImageRpc, () => {
        return {
          upload({ field }) {
            return { url: "" };
          },
        };
      });
    });

    DataSelection.select(RichTextEntitySelection, {
      children: {
        image: {
          relations: {
            file: { pick: ["url"] },
            previewFile: { pick: ["url"] },
          },
        },
      },
    });
  }
}
