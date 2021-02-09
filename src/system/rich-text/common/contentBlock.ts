import { Awaitable } from "@dabsi/common/typings2/Async";
import { Union } from "@dabsi/common/typings2/Union";
import { RichTextConfig } from "@dabsi/system/rich-text/common/types";
import { RichTextPacker } from "@dabsi/system/rich-text/packer";
import { RichTextUnpacker } from "@dabsi/system/rich-text/unpacker";

declare global {
  namespace IRichText {
    type StyleType<Packed, Unpacked = Packed> = {
      packed: Packed | undefined;
      unpacked: Unpacked | undefined;
    };

    interface BlockStyleTypes {}

    interface BlockDataTypes {}

    interface BlockStyleTypes {}
  }
}

export namespace RichTextBlock {
  export type Type = keyof IRichText.BlockDataTypes;

  export interface HandlerAndOptions<T extends Type = Type> {
    readonlyKeys?: (string & keyof RichTextBlock.UnpackedData<T>)[];
    pack(
      data: RichTextBlock.UnpackedData<T>,
      packer: RichTextPacker
    ): Awaitable<RichTextBlock.PackedData<T>>;
  }

  export interface Options<T extends Type = Type> extends HandlerAndOptions<T> {
    unpack?(
      data: RichTextBlock.PackedData<T>,
      unpacker: RichTextUnpacker
    ): Awaitable<RichTextBlock.UnpackedData<T>>;
  }

  export interface Handler<T extends Type = Type> extends HandlerAndOptions<T> {
    unpack(
      data: RichTextBlock.PackedData<T>,
      unpacker: RichTextUnpacker
    ): Awaitable<RichTextBlock.UnpackedData<T>>;
  }

  export type PackedData<
    K extends Type
  > = IRichText.BlockDataTypes[K]["packed"];

  export type UnpackedData<
    K extends Type
  > = IRichText.BlockDataTypes[K]["unpacked"];

  export type Styles = Partial<IRichText.BlockStyleTypes>;

  export type StyleType = keyof IRichText.BlockStyleTypes;

  export type PackedStyle<
    T extends StyleType
  > = IRichText.BlockStyleTypes[T]["packed"];

  export type UnpackedStyle<
    T extends StyleType
  > = IRichText.BlockStyleTypes[T]["unpacked"];

  export interface StyleHandlerAndOptions<T extends StyleType> {
    pack(
      style: UnpackedStyle<T>,
      packer: RichTextPacker
    ): Awaitable<PackedStyle<T>>;

    unpack?(
      style: PackedStyle<T>,
      unpacker: RichTextUnpacker
    ): Awaitable<UnpackedStyle<T>>;
  }

  export interface StyleHandler<T extends StyleType>
    extends StyleHandlerAndOptions<T> {}

  export interface StyleOptions<T extends StyleType>
    extends StyleHandlerAndOptions<T> {}

  export type PackedStyleRange = [type: string, offset: number, length: number];

  export type PackedEntityRange = [key: number, offset: number, length: number];

  export type Packed = Union<
    {
      [K in Type]: {
        type: K;
        text: string;
        depth: number;
        key: string;
        /* packedData */
        styles: Styles;
        data: PackedData<K>;
        styleRanges: PackedStyleRange[];
        entityRanges: PackedEntityRange[];
      };
    }
  >;

  export type Raw<T extends Type = Type> = Union<
    {
      [K in T]: {
        type: K;
        text: string;
        key: string;
        styleRanges: PackedStyleRange[];
        entityRanges: PackedEntityRange[];
        depth: number;
        style: Styles;
        data: UnpackedData<K>;
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
