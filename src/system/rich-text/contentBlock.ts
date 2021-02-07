import { Awaitable } from "@dabsi/common/typings2/Async";
import { Union } from "@dabsi/common/typings2/Union";
import { RichTextPacker } from "@dabsi/system/rich-text/packer";
import { RichTextUnpacker } from "@dabsi/system/rich-text/unpacker";

declare global {
  namespace IRichText {
    interface BlockStyles {
      align?: "CENTER" | "LEFT" | "RIGHT";
    }

    type BlockDataType<
      Packed extends object = {},
      Unpacked extends object = Packed,
      Common extends object = {}
    > = {
      packed: Packed & Common;
      unpacked: Unpacked & Common;
    };

    interface BlockDataTypes {
      unstyled: BlockDataType;
      header: BlockDataType<{
        level: 1 | 2 | 3 | 4 | 5 | 6;
      }>;
    }
  }
}

export namespace RichTextBlock {
  export type Type = keyof IRichText.BlockDataTypes;

  export interface HandlerAndOptions<T extends Type = Type> {
    readonlyKeys?: (string & keyof RichTextBlock.UnpackedData<T>)[];
    pack(
      packer: RichTextPacker,
      unpackedData: RichTextBlock.UnpackedData<T>
    ): Awaitable<RichTextBlock.PackedData<T>>;

    unpack(
      unpacker: RichTextUnpacker,
      packedData: RichTextBlock.PackedData<T>
    ): Awaitable<RichTextBlock.UnpackedData<T>>;
  }

  export interface Options<T extends Type = Type>
    extends HandlerAndOptions<T> {}

  export interface Handler<T extends Type = Type>
    extends HandlerAndOptions<T> {}

  export type PackedData<
    K extends Type
  > = IRichText.BlockDataTypes[K]["packed"];

  export type UnpackedData<
    K extends Type
  > = IRichText.BlockDataTypes[K]["unpacked"];

  export type Styles = IRichText.BlockStyles;

  export type PackedStyleRange = [type: string, offset: number, length: number];

  export type PackedEntityRange = [key: number, offset: number, length: number];

  export type Packed = Union<
    {
      [K in Type]: {
        type: K;
        text: string;
        depth: number | undefined;
        key: string;
        /* packedData */
        styles: Styles | undefined;
        data: PackedData<K>;
        styleRanges: PackedStyleRange[] | undefined;
        entityRanges: PackedEntityRange[] | undefined;
      };
    }
  >;

  export type Unpacked = Union<
    {
      [K in Type]: {
        type: K;
        text: string;
        key: string;
        inlineStyleRanges: Draft.RawDraftInlineStyleRange[];
        entityRanges: Draft.RawDraftEntityRange[];
        depth: number;
        data: UnpackedData<K> & {
          styles: Styles;
        };
      };
    }
  >;
}
